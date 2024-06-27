import { Image, Box, useColorModeValue, VStack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Content = ({ img, title, date, id }) => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const post = () => {
    navigate(`/post/${id}`);
  };

  return (
    <Box bgColor={bgColor} isTruncated maxWidth="360px" maxHeight="270px" borderRadius="md" overflow="hidden" cursor="pointer" onClick={post} w="360px" h="270px">
      <Image alignItems={'center'} src={img} alt={title} userSelect="none" borderRadius="md" minWidth="360px" maxWidth={'360px'} minHeight={'197px'} maxHeight="197px" />
      <VStack align="start" p={1} spacing={1}>
        <Text fontWeight="bold">{title}</Text>
        <Text fontSize="sm">Uploaded: {date}</Text>
      </VStack>
    </Box>
  );
};

export default Content;
