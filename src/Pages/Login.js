import React, { useState } from "react";
import { Heading } from "../Component/Heading";
import { SubHeading } from "../Component/SubHeading";
import { InputBox } from "../Component/InputBox";
import { Button } from "../Component/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { loginRoute } from "../ApiRoutes/routes";
import { Spinner } from "@chakra-ui/react";
import { LogoImage } from "../Component/LogoImage";
import zod from "zod";

export const Login = () => {
  const toast = useToast();
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });
  const navigateTo = useNavigate();
  const [startRegisterProcess, setStartRegisterProcess] = useState(false);

  const inputSchema = zod.object({
    userName: zod.string().min(3),
    password: zod.string().min(4),
  });

  const handleTost = ({ title, description, status }) => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  const handelSubbmit = async (e) => {
    try {
      e.preventDefault();
      setStartRegisterProcess(true);

      // validate input
      try {
        inputSchema.parse(userData);
      } catch (error) {
        handleTost({
          title: "Invalid Input",
          description: "Please enter valid input",
          status: "info",
        });
        setStartRegisterProcess(false);
        return;
      }

      const response = await axios.post(loginRoute, userData);
      handleTost({
        title: response.data.message,
        description: "Aou are now transfer money to any anyone",
        status: "success",
      });
      await localStorage.setItem("token", JSON.stringify(response.data.token));
      await localStorage.setItem("userName" , JSON.stringify(userData.userName));
      setStartRegisterProcess(false);
      navigateTo("/");
    } catch (error) {
      setStartRegisterProcess(false);
      // console.log(error);
      handleTost({
        title: error.response.data.msg,
        description: "Try to create another account",
        status: "error",
      });
    }
  };

  const handelInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  return (
    <div className="h-screen w-screen flex justify-center bg-slate-900">
      <div className="flex justify-center items-center">
        <div className="rounded-lg text-center p-3 h-max px-4 bg-black text-white sm:w-96 w-80  flex flex-col gap-3">
          <LogoImage
            width="w-2/4"
            src="https://www.paytmbank.com/_next/static/media/paytmbank-logo.4ba3db09.svg"
          />

          <Heading label="Login" />
          <SubHeading className="" label="Login to your account" />
          <InputBox
            onChange={handelInputChange}
            value={userData.userName}
            name="userName"
            type="email"
            label="Email"
            placeholder="Enter your email"
          />
          <InputBox
            onChange={handelInputChange}
            value={userData.password}
            name="password"
            type=""
            label="Password"
            placeholder="Enter your password"
          />
          <Button
            onClick={handelSubbmit}
            label={startRegisterProcess ? <Spinner /> : "Login"}
          />

          <div className="flex items-center justify-center ">
            <SubHeading label="Don’t have an account? " />
            <span>
              <NavLink
                to="/register"
                className="text-blue-500 hover:text-blue-700"
              >
                {" "}
                Register
              </NavLink>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
