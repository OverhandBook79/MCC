import { Flex, VStack } from "@chakra-ui/react";
import Content from "./Content";
import React from "react";

const Contents = () => {
  return (
    <VStack w={'full'}>  
      <Flex gap={4} w={'full'} overflowX="auto" justifyContent={'left'} alignItems={'flex-start'}>
          <Content />
          <Content />
          <Content />
          <Content />
      </Flex>
    </VStack>
  );
};

export default Contents;
