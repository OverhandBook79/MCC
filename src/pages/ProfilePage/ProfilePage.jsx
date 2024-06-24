import React from 'react';
import { Box, Flex, Avatar, Heading, Text, Button, Badge } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { MdEdit } from "react-icons/md";

const ProfilePage = ({ user, onAvatarModalOpen }) => {
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null; // Return null to prevent rendering before redirecting
  }

  return (
    <Box>
      <Box p={4}>
        <Flex direction="column" align="center" maxW="md" mx="auto"  p={6} rounded="md" boxShadow="md">
          <Box position="relative">
            <Avatar name={user.username} src={user.avatar} size="xl" mb={4} cursor="pointer" />
            <Badge 
              position="absolute" 
              bottom={3} 
              right={-2} 
              bg="blue.500" 
              color="white" 
              borderRadius="full" 
              px={3} 
              py={3} 
              cursor="pointer" 
              onClick={onAvatarModalOpen}
            >
              <MdEdit />
            </Badge>
          </Box>
          <Heading as="h2" size="lg" mb={2}>{user.username}</Heading>
          <Text fontSize="md" mb={4}>{user.email}</Text>
          <Button colorScheme="blue" onClick={() => navigate('/')}>Back to Home</Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default ProfilePage;
