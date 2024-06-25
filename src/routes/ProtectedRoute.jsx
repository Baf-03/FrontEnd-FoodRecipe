import { Spinner } from "@material-tailwind/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import PrimarySearchAppBar from "../components/Navbar";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const gettoken = localStorage.getItem("token");
        if (!gettoken) {
          setIsAuthenticated(true);
          console.log("User can not access protected routes page.");
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "https://backend-food-recipe-eight.vercel.app/api/verifyuser",
          {
            headers: {
              Authorization: `Bearer ${gettoken}`,
            },
          }
        );
        if (!response?.data?.status) {
          console.log("User can not access protected routes page.");
          setIsAuthenticated(true);
          navigate("/login");
          return;
        }
        setLoading(false);
      } catch (error) {
        console.error("Error occurred during authentication:", error.message);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-[100%] h-[100vh] flex flex-col justify-center items-center">
          <Spinner className="h-12 w-12" />
          loading...
        </div>
      ) : (
        <>
          {isAuthenticated ? (
            <>redirect to dashboard</>
          ) : (
            <>
              <PrimarySearchAppBar />
              <Outlet />
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProtectedRoute;
