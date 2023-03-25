import React from "react";
import {
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  Text,
  Avatar,
  MenuList,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../store/Authreducer/action";

const Navbar = () => {
  const { isAuth, user } = useSelector((store) => store.authreducer);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  console.log("helo navbar", isAuth);
  return (
    <Flex
      padding={{ base: "1.5rem 2rem", md: "1.5rem 8rem", lg: "1.5rem 8rem" }}
      height={"60px"}
      gap={6}
      justifyContent={"space-between"}
      alignItems={"center"}
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
    >
      <Heading as="h4" size="md">
        Notes App
      </Heading>
      <Flex alignItems={"center"} gap={6}>
        <Text fontWeight={600}>Notes</Text>

        {isAuth ? (
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar
                size={"sm"}
                src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
              />
            </MenuButton>

            <MenuList>
              <MenuItem>Hello , {user}</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <NavLink
          to="/signin"
            style={({ isActive, isPending }) => {
              return {
                fontWeight: isActive ? "600" : "600" ,
                color: isActive  ? "red" : "black",
              };
            }}
          >
            Sign In
          </NavLink>
        )}
      </Flex>
    </Flex>
  );
};

export { Navbar };
