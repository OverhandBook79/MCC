import React from 'react';
import { Box, Flex, Avatar, Heading, Text, Button, Badge, IconButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { EditIcon } from '@chakra-ui/icons';
import { MdEdit } from "react-icons/md";

const ProfilePage = ({ user, onAvatarModalOpen, onBioModalOpen }) => {
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null; // Return null to prevent rendering before redirecting
  }

  return (
    <Box>
      <Box p={4}>
        <Flex direction="column" align="center" maxW="md" mx="auto" p={6} rounded="md" boxShadow="md">
          <Box position="relative">
            <Avatar name={user.username} src={user.avatar} size="xl" mb={4} cursor="pointer" />
            <Badge 
              position="absolute" 
              bottom={4} 
              right={0} 
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
          <Flex justifyContent="space-between" width="100%">
            <Heading as="h2" size="lg" mb={2}>{user.username}</Heading>
            <IconButton
              aria-label="Edit Profile"
              icon={<EditIcon />}
              onClick={onBioModalOpen}
            />
          </Flex>
          <Text fontSize="md" mb={4}>{user.email}</Text>
          <Text fontSize="md" mb={4}>{user.bio || 'No bio available'}</Text>
          <Button colorScheme="blue" onClick={() => navigate('/')}>Back to Home</Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default ProfilePage;
