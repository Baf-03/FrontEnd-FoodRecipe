import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CarousalRecipe } from "./Carousal";
import { Button } from "@material-tailwind/react";

const RecipeComp = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [imgs, setImgs] = useState([]);
  const [favorites,setFavorites] = useState(false)
  const [doneSteps, setDoneSteps] = useState(() => {
    // Initialize from localStorage or default to empty array
    const savedDoneSteps = localStorage.getItem(`doneSteps_${id}`);
    return savedDoneSteps ? JSON.parse(savedDoneSteps) : [];
  });

  useEffect(()=>{
      const getfavcheck= async()=>{
        const objToSend ={
          userId:localStorage.getItem("userid"),
          projectId:id,
        }
       
          const resp = await axios.post("https://backend-food-recipe-eight.vercel.app/api/checkfavoritesbyid",objToSend,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        console.log("getresp",resp)
        console.log("what is",resp?.data)
        if(resp?.data?.data){
          setFavorites(true)
          return
        }
        setFavorites(false)
      }
      getfavcheck()
  },[])


  const favoritesClickHandler = async()=>{
    console.log("fav",favorites)
    const objToSend ={
      userId:localStorage.getItem("userid"),
      projectId:id,
      favorites:favorites
    }
   
      const resp = await axios.post("https://backend-food-recipe-eight.vercel.app/api/addfavorites",objToSend,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    setFavorites(!favorites)
    console.log("what",resp)
    } 
   
  

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://backend-food-recipe-eight.vercel.app/api/findrecipe?recipe=${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setImgs(response?.data?.data?.images);
        setData(response?.data?.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  useEffect(() => {
    localStorage.setItem(`doneSteps_${id}`, JSON.stringify(doneSteps));
  }, [doneSteps, id]);

  const toggleStepDone = (index) => {
    setDoneSteps((prevDoneSteps) => {
      const newDoneSteps = [...prevDoneSteps]; // Copy the previous array
      newDoneSteps[index] = !newDoneSteps[index]; // Toggle the value at the specified index
      return newDoneSteps;
    });
  };

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Error fetching recipe.</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="h-[20rem]">
        <CarousalRecipe imgs={imgs} />
      </div>
      <h2 className="text-3xl font-bold my-5">
        Recipe Name:{" "}
        <span className="text-red-500 capitalize">{data?.recipe_name}</span>
      </h2>
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h3 className="text-xl font-bold mb-2">Ingredients:</h3>
        <p className="text-lg">{data?.ingredients}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Steps To Make</h2>
        {data?.steps?.map((step, index) => (
          <div key={index} className="flex items-center mb-4">
            <input
              type="checkbox"
              className="mr-2"
              checked={doneSteps[index] || false}
              onChange={() => toggleStepDone(index)}
            />
            <p className={`${doneSteps[index] && "line-through"} text-lg`}>
              {step}
            </p>
          </div>
        ))}
      </div>
      <Button className="mt-3" onClick={favoritesClickHandler}>
        {favorites?(<>Remove from Favorites</>):(<>Add to favorites</>)}
      </Button>
    </div>
  );
};

export default RecipeComp;
