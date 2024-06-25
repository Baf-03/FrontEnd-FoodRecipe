import React, { useEffect, useState } from "react";
import { CardComp } from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getRecipes } from "../../state/DashboardSlice/dashboardSlice";
import { Input, Spinner } from "@material-tailwind/react";
import axios from "axios";
import { Button } from "@mui/material";

const Dashboard = () => {
  const { token } = useSelector((state) => state.LoginReducer);
  const { data } = useSelector((state) => state.DashBoardReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataDashboard, setDataDashboard] = useState([]);
  const [autoComplete, setAutoComplete] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    dispatch(getRecipes({ token }));
  }, [token]);

  useEffect(() => {
    setDataDashboard(data);
  }, [data]);

  const handleSearchChange = async (e) => {
    setSearchValue(e);
    if (e) {
      const response = await axios.get(
        `https://backend-food-recipe-eight.vercel.app/api/autocompletesearch?t=${e}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.data?.length) {
        setAutoComplete(response?.data?.data);
      } else {
        setAutoComplete([]);
      }
    } else {
      setAutoComplete([]);
    }
    // dataDashboard(data)
  };
  const submitHandler = async () => {
    setAutoComplete([]);
    const searchResp = await axios.get(
      `https://backend-food-recipe-eight.vercel.app/api/searchrecipe?t=${searchValue}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (searchResp?.data?.data?.length) {
      setDataDashboard(searchResp?.data?.data);
      return;
    }
    setDataDashboard(data);
  };

  return (
    <div className="text-white py-5 ">
      {dataDashboard ? (
        <>
          <div className="w-[80%] justify-center md:w-[40%] my-4 m-auto flex flex-col items-center">
            <div className="w-[100%] flex ">
              <Input
                label="Search Recipe"
                value={searchValue}
                placeholder="Enter Racipe Name"
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <Button onClick={submitHandler}>Search</Button>
            </div>
            <div className="text-black  w-[100%] flex flex-col gap-2 mt-2 ms-2  ">
              {autoComplete ? (
                <>
                  {autoComplete?.map((element, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => setSearchValue(element?.recipe_name)}
                      >
                        {element?.recipe_name}
                      </div>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <span className="text-red-500 italic bold  justify-center ms-6">
            showing results for {searchValue || "all"}
          </span>
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

export default Dashboard;
