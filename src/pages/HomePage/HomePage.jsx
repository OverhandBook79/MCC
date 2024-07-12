import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import Content from '../../components/Content/Content';

const HomePage = () => {
  return (
    <Box p={5} gap={5}>
      <Heading as='h1' mb={5}>
        Home Page
      </Heading>
      {/* {['Addon', 'World', 'Skin', 'Server'].map((category) => (
        <Box key={category} mb={5}>
          <Heading as='h2' size='lg' mb={3}>
            {category}
          </Heading>
          <Contents category={category} />
        </Box>
      ))} */}
      <Content/>
      <Content/>
      <Content/>
      <Content/>
    </Box>
  );
};

export default HomePage;
