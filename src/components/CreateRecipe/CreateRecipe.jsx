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

  const submitRecipe = async () => {
    setLoading(true);

    if (!inputs.length || !recipeName || !ingredients || !files.length) {
      alert("all fields are required");
      setLoading(false);

      return;
    }

    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    try {
      const getImagesResp = await axios.post(
        "https://different-gold-vulture.cyclic.app/api/uploadimage",
        formData
      );
      if (!getImagesResp?.data?.status) {
        alert("something went wrong on our side plz try again later");
        setLoading(false);

        return;
      }
      const imgurls = getImagesResp?.data?.data;
      const objToSend = {
        ingredients,
        recipeName,
        steps: inputs,
        images: imgurls,
        user_id:localStorage.getItem("userid")
      };
      const recipeResponse = await axios.post(
        "https://different-gold-vulture.cyclic.app/api/createrecipe",
        objToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setOpen(true);
      setLoading(false);
      setRecipeName("");
      setIngredients("");
      setInputs([]);
      setStepsCount("");
      setFiles([]);
    } catch (error) {
      console.error("Error uploading images:", error);
      setLoading(false);
    }
  };
  const handleStepsCountChange = (e) => {
    const value = e.target.value;
    if (value <= 15 && value >= 0) {
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
    <div key={index}>
      <img
        src={URL.createObjectURL(file)}
        // alt={file.name}
        className="w-[100px] "
      />
    </div>
  ));

  const renderAdditionalInputs = () => {
    return Array.from({ length: stepscount }, (_, index) => (
      <Input
        key={index}
        variant="standard"
        label={`Step ${index + 1}`}
        placeholder={`Enter step ${index + 1}`}
        value={inputs[index] || ""}
        onChange={(e) => handleInputChange(index, e.target.value)}
      />
    ));
  };

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div className=" py-5 flex flex-col items-center justify-center">
      <h2 className="font-bold text-[1.5rem] my-4">Add Your Recipe</h2>
      <div className="p-3 md:w-[50%] flex flex-col gap-4 ">
        <Input
          value={recipeName}
          variant="standard"
          label="Recipe Name"
          placeholder="Enter Recipe Name"
          onChange={(e) => setRecipeName(e.target.value)}
        />
        <Input
          value={ingredients}
          variant="standard"
          label="Ingredients"
          placeholder="Enter Ingredients"
          onChange={(e) => setIngredients(e.target.value)}
        />
        <Input
          variant="standard"
          value={stepscount}
          onChange={handleStepsCountChange}
          type="number"
          label="Enter steps count"
          placeholder="Enter Recipe Name"
        />
        <div className="flex flex-col gap-4 max-h-[20rem] overflow-y-scroll p-4">
          {stepscount ? renderAdditionalInputs() : null}
        </div>
        <div
          {...getRootProps()}
          className="border border-red-500 p-5 min-h-[10rem] flex justify-center items-center"
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          <div className="flex flex-wrap gap-3 justify-center ">
            {" "}
            {imagePreviews}
          </div>
        </div>
      </div>
      <Button
        sx={{ marginTop: 2 }}
        onClick={submitRecipe}
        disabled={loading == true}
      >
        {loading ? <Spinner /> : "Submit Recipe"}
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          This is a success Alert inside a Snackbar!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateRecipe;
