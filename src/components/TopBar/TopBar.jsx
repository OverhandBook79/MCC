// src/components/TopBar.jsx
import React from 'react';
import { Flex, Button, useDisclosure, Input, useColorModeValue, useColorMode, Image } from '@chakra-ui/react';
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';
import TopBarDrawer from './TopBarDrawer';

const TopBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const logoSrc = colorMode === 'light' ? '/logo-light.png' : '/logo-dark.png';
  const bgColor = useColorModeValue("gray.50", "gray.900");

  return (
    <Flex justifyContent="space-between" p={4} borderBottom="1px" borderColor="gray.200" bgColor={bgColor} gap={2}>
      <Flex as={Link} to="/">
        <Image src={logoSrc} h={10} cursor="pointer" />
      </Flex>
      <Input placeholder="Search" width="full" />
      <Flex>
        <Button onClick={onOpen}><RxHamburgerMenu /></Button>
        <TopBarDrawer isOpen={isOpen} onClose={onClose} />
      </Flex>
    </Flex>
  );
};

export default TopBar;
