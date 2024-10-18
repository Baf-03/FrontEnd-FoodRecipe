import { Input, Spinner } from "@material-tailwind/react";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import axios from "axios";

const CreateRecipe = () => {
  const [stepscount, setStepsCount] = useState("");
  const [inputs, setInputs] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const submitRecipe = async () => {
    setLoading(true);

    if (!inputs.length || !recipeName || !ingredients || !files.length) {
      alert("All fields are required");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    files.forEach((file, index) => formData.append(`file${index}`, file));

    try {
      const getImagesResp = await axios.post(
        "https://backend-food-recipe-eight.vercel.app/api/uploadimage",
        formData
      );

      if (!getImagesResp?.data?.status) {
        alert("Something went wrong, please try again later.");
        setLoading(false);
        return;
      }

      const imgurls = getImagesResp?.data?.data;
      const objToSend = {
        ingredients,
        recipeName,
        steps: inputs,
        images: imgurls,
        user_id: localStorage.getItem("userid"),
      };

      await axios.post(
        "https://backend-food-recipe-eight.vercel.app/api/createrecipe",
        objToSend,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setOpen(true);
      resetForm();
    } catch (error) {
      console.error("Error uploading images:", error);
      setLoading(false);
    }
  };

  const resetForm = () => {
    setRecipeName("");
    setIngredients("");
    setInputs([]);
    setStepsCount("");
    setFiles([]);
    setLoading(false);
  };

  const handleStepsCountChange = (e) => {
    const value = e.target.value;
    if (value >= 0 && value <= 15) {
      setStepsCount(value);
      setInputs([]);
    }
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const imagePreviews = files.map((file, index) => (
    <div key={index} className="relative">
      <img
        src={URL.createObjectURL(file)}
        alt="Preview"
        className="w-24 h-24 object-cover rounded-lg border"
      />
    </div>
  ));

  const renderAdditionalInputs = () =>
    Array.from({ length: stepscount }, (_, index) => (
      <Input
        key={index}
        variant="standard"
        label={`Step ${index + 1}`}
        placeholder={`Enter step ${index + 1}`}
        value={inputs[index] || ""}
        onChange={(e) => handleInputChange(index, e.target.value)}
        className="mt-2"
      />
    ));

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-teal-600 mb-6">Add Your Recipe</h2>

      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6">
        <Input
          value={recipeName}
          variant="standard"
          label="Recipe Name"
          placeholder="Enter Recipe Name"
          onChange={(e) => setRecipeName(e.target.value)}
          className="mb-4"
        />
        <Input
          value={ingredients}
          variant="standard"
          label="Ingredients"
          placeholder="Enter Ingredients"
          onChange={(e) => setIngredients(e.target.value)}
          className="mb-4"
        />
        <Input
          variant="standard"
          value={stepscount}
          onChange={handleStepsCountChange}
          type="number"
          label="Number of Steps"
          placeholder="Enter the number of steps"
          className="mb-4"
        />

        <div className="max-h-60 overflow-y-auto p-2">
          {renderAdditionalInputs()}
        </div>

        <div
          {...getRootProps()}
          className="border-2 border-dashed border-teal-500 p-5 rounded-lg mt-4 flex flex-col items-center justify-center cursor-pointer hover:bg-teal-50 transition"
        >
          <input {...getInputProps()} />
          <p className="text-gray-500">Drag 'n' drop files here, or click to select files</p>
          <div className="mt-2 flex flex-wrap gap-3">{imagePreviews}</div>
        </div>

        <Button
          onClick={submitRecipe}
          disabled={loading}
          className="w-full mt-6 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg transition"
        >
          {loading ? <Spinner /> : "Submit Recipe"}
        </Button>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Recipe submitted successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateRecipe;
