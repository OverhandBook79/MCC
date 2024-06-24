import React from 'react';
import { Box, Flex, Text, Avatar, Button, Input } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const TopBar = ({ user, onLogin, onLogout }) => {
  return (
    <Flex justifyContent="space-between" p={4} borderBottom="1px" borderColor="gray.200">
      <Text fontSize="2xl" fontWeight="bold">MCDL</Text>
      <Input placeholder="Search" width="40%" />
      <Box>
        {user ? (
          <Flex alignItems="center">
            <RouterLink to="/profile">
              <Avatar name={user.username} src={user.avatar} size="sm" cursor="pointer" />
            </RouterLink>
            <Text ml={2}>{user.username}</Text>
            <Button ml={4} onClick={onLogout}>Logout</Button>
          </Flex>
        ) : (
          <Button onClick={onLogin}>Login</Button>
        )}
      </Box>
    </Flex>
  );
};

export default TopBar;
