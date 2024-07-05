// src/components/TopBar.jsx
import React from 'react';
import { Flex, Button, Avatar, Text, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton, VStack, Input, useColorModeValue, useColorMode, Image, IconButton } from '@chakra-ui/react';
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { BiWorld } from "react-icons/bi";
import { TbWorld } from "react-icons/tb";
import { AiOutlineSkin } from "react-icons/ai";
import { IoExtensionPuzzleOutline } from 'react-icons/io5';
import { HiOutlineHome } from "react-icons/hi2";
import { FaGithub, FaMoon, FaSun, FaYoutube } from 'react-icons/fa';
import ProfileLink from './ProfileLink';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import AuthModalButton from '../Buttons/AuthModalButton';

const TopBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logoSrc = colorMode === 'light' ? '/logo-light.png' : '/logo-dark.png';
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const [user] = useAuthState(auth);
  const renderUser = user;

  return (
    <Flex justifyContent="space-between" p={4} borderBottom="1px" borderColor="gray.200" bgColor={bgColor} gap={2}>
      <Flex as={Link} to="/">
        <Image src={logoSrc} w={"10vh"} h={"10vh"} cursor="pointer" />
      </Flex>
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
                {renderUser ? (
                  <>
                    <ProfileLink/>
                    <Button as={Link} to="/" onClick={onClose} w="100%" gap={2}><HiOutlineHome /> Home</Button>
                    <Button as={Link} to="/addons" onClick={onClose} w="100%" gap={2}><IoExtensionPuzzleOutline /> Addons</Button>
                    <Button as={Link} to="/worlds" onClick={onClose} w="100%" gap={2}><BiWorld /> Worlds</Button>
                    <Button as={Link} to="/skins" onClick={onClose} w="100%" gap={2}><AiOutlineSkin /> Skins</Button>
                    <Button as={Link} to="/servers" onClick={onClose} w="100%" gap={2}><TbWorld /> Servers</Button>
                    <Button w="100%" onClick={onLogout} gap={2} ><CiLogout /> Logout</Button>
                  </>
                ) : (
                  <>
                    <AuthModalButton/>
                    <Button as={Link} to="/" onClick={onClose} w="100%" gap={2}><HiOutlineHome /> Home</Button>
                    <Button as={Link} to="/addons" onClick={onClose} w="100%" gap={2}><IoExtensionPuzzleOutline /> Addons</Button>
                    <Button as={Link} to="/worlds" onClick={onClose} w="100%" gap={2}><BiWorld /> Worlds</Button>
                    <Button as={Link} to="/skins" onClick={onClose} w="100%" gap={2}><AiOutlineSkin /> Skins</Button>
                    <Button as={Link} to="/servers" onClick={onClose} w="100%" gap={2}><TbWorld /> Servers</Button>
                  </>
                )}
                <Flex gap={2} justifyContent="center">
                  <Link href="https://github.com/OverhandBook79" isExternal>
                    <IconButton>
                      <FaGithub />
                    </IconButton>
                  </Link>
                  <Link href="https://youtube.com/@overhandbook79?si=sy6-m4INPuUcq1Ia" isExternal>
                    <IconButton>
                      <FaYoutube />
                    </IconButton>
                  </Link>
                  <IconButton onClick={toggleColorMode}>
                    {colorMode === 'light' ? <FaMoon /> : <FaSun />}
                  </IconButton>
                </Flex>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    </Flex>
  );
};

export default TopBar;
