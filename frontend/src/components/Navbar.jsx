import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex
      padding={"1.5rem 8rem"}
      height={"60px"}
      gap={6}
      justifyContent={"space-between"}
      alignItems={"center"}
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
    >
      <Heading as="h4" size="md">
        Welcome
      </Heading>
      <Flex  gap={6}>
        <Text fontWeight={600}>Sign In</Text>
        <Text fontWeight={600}>Notes</Text>
      </Flex>
    </Flex>
  );
};

export default Navbar;
