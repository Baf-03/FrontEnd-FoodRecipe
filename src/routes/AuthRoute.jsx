import { Spinner } from "@material-tailwind/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const gettoken = localStorage.getItem("token");
        if (!gettoken) {
          console.log("User can access login page.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://different-gold-vulture.cyclic.app/api/verifyuser",
          {
            headers: {
              Authorization: `Bearer ${gettoken}`,
            },
          }
        );
        if (response?.data?.status) {
          setIsAuthenticated(true);
          setLoading(false);
          navigate("/");
          return;
        }
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error("Error occurred during authentication:", error.message);
        setLoading(false);
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
              <Outlet />
            </>
          )}
        </>
      )}
    </>
  );
};

export default AuthRoute;
