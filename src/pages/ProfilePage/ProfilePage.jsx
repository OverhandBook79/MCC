import { Avatar, Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const ProfilePage = ({ user }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    navigate('/');
    return null; 
  }

  return (
    <Box p={4}>
      <Flex direction="column" align="center" maxW="md" mx="auto" bg="gray.50" p={6} rounded="md" boxShadow="md">
        <RouterLink to="/profile">
          <Avatar name='Adolf Hitler' src='' size="2xl" mb={4} cursor="pointer" />
        </RouterLink>
        <Heading as="h2" size="lg" mb={2}>Adolf Hitler</Heading>
        <Text fontSize="md" mb={4}>john.doe@example.com</Text>
        <Button colorScheme="blue" onClick={() => navigate('/')}>Back to Home</Button>
      </Flex>
      <Button ml={4} onClick={handleLogout}>Logout</Button>
    </Box>
  )
}

export default ProfilePage