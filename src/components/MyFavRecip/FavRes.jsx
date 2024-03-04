import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getRecipes } from "../../state/DashboardSlice/dashboardSlice";
import { Input, Spinner } from "@material-tailwind/react";
import axios from "axios";
import { Button } from "@mui/material";
import { CardComp } from "../Dashboard/Card";

const FavRecipe = () => {
  const { token } = useSelector((state) => state.LoginReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataDashboard, setDataDashboard] = useState([]);

  useEffect(() => {
    const objToSend = {
      userId: localStorage.getItem("userid"),
    };
    const getFavRes = async () => {
      try {
        const resp = await axios.post(
          "https://different-gold-vulture.cyclic.app/api/getallfavorites",
          objToSend,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDataDashboard(resp?.data?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFavRes()
  }, []);
  return (
    <div className="text-white py-5 ">
      {dataDashboard ? (
        <>
          <div className="flex flex-wrap flex-col sm:flex-row items-center justify-center lg:items-start gap-5 w-[97%] sm:w-[90%] m-auto">
            {dataDashboard?.map((element, index) => {
              return (
                <div key={index} className="cursor-pointer">
                  <Link to={`/recipe/${element._id}`}>
                    <CardComp detail={element} />
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="w-[100%] h-[80vh] flex justify-center items-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default FavRecipe;
