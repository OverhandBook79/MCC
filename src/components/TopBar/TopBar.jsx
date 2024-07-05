// src/components/TopBar.jsx
import React from 'react';
import { Flex, Button, Avatar, Text, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton, VStack, Input, useColorModeValue, Link as ChakraLink, useColorMode, Link, Image } from '@chakra-ui/react';
import { RxHamburgerMenu } from "react-icons/rx";
import { Link as RouterLink } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { BiWorld } from "react-icons/bi";
import { TbWorld } from "react-icons/tb";
import { AiOutlineSkin } from "react-icons/ai";
import { IoExtensionPuzzleOutline } from 'react-icons/io5';
import { HiOutlineHome } from "react-icons/hi2";

const TopBar = ({ user, onLogin, onLogout }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logoSrc = colorMode === 'light' ? '/logo-light.png' : '/logo-dark.png';
  const bgColor = useColorModeValue("gray.50", "gray.900");

  return (
    <Flex justifyContent="space-between" p={4} borderBottom="1px" borderColor="gray.200" bgColor={bgColor} gap={2}>
      <ChakraLink as={Link} to="/">
          <Image src={logoSrc} h={10} display={{ base: "none", sm: "block" }} cursor="pointer" />
      </ChakraLink>
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
                    <Button as={RouterLink} to={'/profile'} onClick={onClose} w={"100%"} gap={2}>
                        <Flex alignItems="center">
                          <Avatar name={user.username} src={user.avatar} size="sm" cursor="pointer" />
                          <Text ml={2} isTruncated maxWidth="200px">{user.username}</Text>
                        </Flex>
                    </Button>
                      <Button as={RouterLink} to="/" onClick={onClose} w="100%" gap={2}><HiOutlineHome /> Home</Button>
                      <Button as={RouterLink} to="/addons" onClick={onClose} w="100%" gap={2}><IoExtensionPuzzleOutline /> Addons</Button>
                      <Button as={RouterLink} to="/worlds" onClick={onClose} w="100%" gap={2}><BiWorld/> Worlds</Button>
                      <Button as={RouterLink} to="/skins" onClick={onClose} w="100%" gap={2}><AiOutlineSkin /> Skins</Button>
                      <Button as={RouterLink} to="/servers" onClick={onClose} w="100%" gap={2}><TbWorld /> Servers</Button>
                      <Button w="100%" onClick={onLogout} gap={2} ><CiLogout /> Logout</Button>
                    </>
                  ) : (
                    <>
                    <Button w="100%" onClick={onLogin}>Login</Button>
                    <Button as={RouterLink} to="/" onClick={onClose} w="100%" gap={2}><HiOutlineHome /> Home</Button>
                    <Button as={RouterLink} to="/addons" onClick={onClose} w="100%" gap={2}><IoExtensionPuzzleOutline /> Addons</Button>
                    <Button as={RouterLink} to="/worlds" onClick={onClose} w="100%" gap={2}><BiWorld/> Worlds</Button>
                    <Button as={RouterLink} to="/skins" onClick={onClose} w="100%" gap={2}><AiOutlineSkin /> Skins</Button>
                    <Button as={RouterLink} to="/servers" onClick={onClose} w="100%" gap={2}><TbWorld /> Servers</Button>
                    </>
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
