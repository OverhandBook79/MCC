import { Image, Box, useColorModeValue, VStack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Content = ({ id, img, title, date }) => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue("gray.50", "gray.900");

  const post = () => {
    navigate(`/post/${id}`);
  };

  return (
    <Box
      bgColor={bgColor}
      maxWidth="360px"
      maxHeight="270px"
      borderRadius="md"
      overflow="hidden"
      cursor="pointer"
      onClick={post}
      w="360px"
      h="270px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Box 
        w="100%" 
        h="100%" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        overflow="hidden"
      >
        <Image
          src={img}
          alt={title}
          objectFit="contain"
          maxW="100%"
          maxH="100%"
        />
      </Box>
      <VStack align="start" p={4} spacing={2}>
        <Text fontWeight="bold">{title}</Text>
        <Text fontSize="sm">Uploaded: {date}</Text>
      </VStack>
    </Box>
  );
};

export default Content;
