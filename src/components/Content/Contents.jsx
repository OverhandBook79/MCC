import { Flex, VStack, Text } from "@chakra-ui/react";
import Content from "./Content";
import React, { useEffect, useState } from "react";

const Contents = ({ category }) => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('contents')) || [];
    const filteredContents = category ? data.filter(item => item.category === category) : data;
    setContents(filteredContents.slice(0, 10));
  }, [category]);

  return (
    <VStack>
      <Flex gap={4} overflowX="auto">
        {contents.length > 0 ? contents.map(content => (
          <Content
            key={content.id}
            img={content.thumbnail}
            title={content.title}
            date={content.date}
            username={content.username}
          />
        )) : (
          <Content
            img=''
            title='No content here'
            date=''
            username=''
          />
        )}
      </Flex>
    </VStack>
  );
};

export default Contents;
