import React, { useEffect } from "react";
import { LoginUser, setEmail, setPassword } from "../../state/LoginSlice";
import { useDispatch, useSelector } from "react-redux";
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
import { Link, useNavigate } from "react-router-dom";

const LoginComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { password, email, loading, logininSucess } = useSelector(
    (state) => state.LoginReducer
  );

  useEffect(() => {
    if (logininSucess) {
      navigate("/");
    }
  }, [logininSucess]);

  const submitHandler = async () => {
    if (!password || !email) {
      alert("all fields are required");
      return;
    }
    dispatch(LoginUser({ email, password }));
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
            Login
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
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
            {loading ? "loading" : "login"}
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
              <Link to={"/signup"}>signup</Link>
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginComp;
