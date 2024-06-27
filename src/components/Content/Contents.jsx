import { Flex, VStack } from "@chakra-ui/react";
import Content from "./Content";
import React from "react";

const Contents = ({ contents }) => {
  return (
    <VStack>  
      <Flex gap={4} overflowX="auto">
        {contents.length > 0 ? contents.map(content => (
          <Content 
            key={content.id} 
            id={content.id} 
            img={content.thumbnail} 
            title={content.title} 
            date={content.date} 
          />
        )) : (
          <Content 
            key="no-content" 
            id="no-content" 
            img="placeholder_image_url" // Use a placeholder image URL
            title="No content here" 
            date="" 
          />
        )}
      </Flex>
    </VStack>
  );
};

export default Contents;
