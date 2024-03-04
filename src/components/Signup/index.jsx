import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  setName,
  setEmail,
  setPassword,
  signupUser,
} from "../../state/SignupSlice";
import { useDispatch, useSelector } from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();
  const { name, email, password, loading, signupsuccess } = useSelector(
    (state) => state.SignupReducer
  );
  const navigate = useNavigate();

  const submitHandler = async () => {
    if (!name || !email || !password) {
      alert("all fields are required");
      return;
    }
    dispatch(signupUser({ name, email, password })).then((res) => {
      if (res?.payload?.status) {
        navigate("/login");
      }
    });
  };

  return (
    <div className="w-[90%] m-auto sm:m-start sm:w-[100%] h-[100vh] flex justify-center items-center">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Name"
            onChange={(e) => dispatch(setName(e.target.value))}
            size="lg"
          />
          <Input
            label="Email"
            onChange={(e) => dispatch(setEmail(e.target.value))}
            size="lg"
          />
          <Input
            label="Password"
            type="password"
            onChange={(e) => dispatch(setPassword(e.target.value))}
            size="lg"
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" onClick={submitHandler} fullWidth>
            {loading ? "loading" : "Sign Up"}
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              <Link to={"/login"}>Login</Link>
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};
export default SignUp;
