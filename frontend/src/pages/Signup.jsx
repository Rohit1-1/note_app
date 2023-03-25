import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  useToast,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { signup } from "../store/Authreducer/action";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userdata, setUserData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { isLoading} = useSelector((store) => store.authreducer);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userdata,
      [name]: value,
    });
  };
  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signup(userdata))
      .then((res) => {
        console.log(res);
        if (res.signup && !res.userExist) {
          toast({
            title: "Sign In successfull",
            status: "success",
            position: "top",
            duration: 5000,
            isClosable: true,
          });
          navigate("/signin");
        } else if (!res.signup && res.userExist) {
          toast({
            title: "User Already exist",
            description: "Try Signin",
            status: "error",
            position: "top",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Something went wrong ",
            description: "Try again later",
            status: "error",
            position: "top",
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Something went wrong ",
          description: "Try again later",
          status: "error",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
      });
    //console.log(userdata);
  };

  return (
    <>
      <Stack
        spacing={4}
        w={"60%"}
        margin="auto"
        marginTop={"4rem"}
        padding={"1.5rem"}
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      >
        <Heading>Sign Up</Heading>
        <form onSubmit={handleSignup}>
          <FormControl id="name" isRequired marginBottom={"1rem"}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" onChange={handleChange} />
          </FormControl>
          <FormControl id="email" isRequired marginBottom={"1rem"}>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" onChange={handleChange} />
          </FormControl>
          <FormControl id="password" isRequired marginBottom={"1rem"}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
              isLoading={isLoading}
            >
              Sign Up
            </Button>
          </Stack>
        </form>
        <Text>
          {" "}
          Already a user ?{" "}
          <NavLink className={"active"} to={"/signin"}>
            Sign in
          </NavLink>
        </Text>
      </Stack>
    </>
  );
};

export default SignUp;
