// src/components/TopBar.jsx
import React from 'react';
import { Flex, Button, Avatar, Text, IconButton, useBreakpointValue, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton, VStack, Input } from '@chakra-ui/react';
import { RxHamburgerMenu } from "react-icons/rx";
import { Link as RouterLink } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";

const TopBar = ({ user, onLogin, onLogout }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex justifyContent="space-between" p={4} borderBottom="1px" borderColor="gray.200" gap={2}>
      <Text fontSize="2xl" fontWeight="bold">MCDL</Text>
      <Input placeholder="Search" width="full" />
        <>
          <Button onClick={onOpen}><RxHamburgerMenu /></Button>
          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
              <DrawerBody>
                <VStack spacing={4}>
                  {user ? (
                    <>
                      <RouterLink to="/profile" onClick={onClose}>
                        <Flex alignItems="center">
                          <Avatar name={user.username} src={user.avatar} size="sm" cursor="pointer" />
                          <Text ml={2} isTruncated maxWidth="200px">{user.username}</Text>
                        </Flex>
                      </RouterLink>
                      <Button w="100%" onClick={onLogout} gap={2} ><CiLogout /> Logout</Button>
                    </>
                  ) : (
                    <Button w="100%" onClick={onLogin}>Login</Button>
                  )}
                  
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
    </Flex>
  );
};

export default TopBar;
