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
import { Link, NavLink, useNavigate } from "react-router-dom";
import { signin } from "../store/Authreducer/action";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userdata, setUserData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { isLoading } = useSelector((store) => store.authreducer);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userdata,
      [name]: value,
    });
  };
  const handleSignin = (e) => {
    e.preventDefault();
    dispatch(signin(userdata))
      .then((res) => {
        if (res.login) {
          toast({
            title: "Signin Successfull",
            status: "success",
            position: "top",
            duration: 5000,
            isClosable: true,
          });
          navigate("/");
        } else if (!res.login) {
          toast({
            title: "Signin Failed",
            description: "Something went wrong! Incorrect email or password",
            status: "error",
            position: "top",
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {});
    console.log(userdata);
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
        <Heading>Sign In</Heading>
        <form onSubmit={handleSignin}>
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
              Sign In
            </Button>
          </Stack>
        </form>
        <Text>
          Don't have an account ?{" "}
          <NavLink className={"active"} to={"/signup"}>
            Sign up
          </NavLink>
        </Text>
      </Stack>
    </>
  );
};

export default SignIn;
