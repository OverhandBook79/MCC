import { Flex, VStack, Text } from "@chakra-ui/react";
import Content from "./Content";
import React from "react";

const Contents = ({ contents }) => {
  if (contents.length === 0) {
    return null;
  }

  return (
    <VStack w={'full'}>  
      <Flex gap={4} w={'full'} overflowX="auto" justifyContent={'left'} alignItems={'flex-start'}>
        {contents.slice(0, 10).map(content => (
          <Content key={content.id} post={content} />
        ))}
      </Flex>
    </VStack>
  );
};

export default Contents;
