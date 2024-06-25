import React from 'react';
import { Flex, IconButton, Link, useColorMode } from '@chakra-ui/react';
import { FaGithub, FaYoutube, FaMoon, FaSun  } from "react-icons/fa";

const BottomBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex gap={2} justifyContent="center" p={4} borderTop="1px" borderColor="gray.200" mt={4}>
      <Link href="https://github.com/OverhandBook79" isExternal>
      <IconButton>  
        <FaGithub/>
      </IconButton>
      </Link>
      <Link href="https://youtube.com/@overhandbook79?si=sy6-m4INPuUcq1Ia" isExternal>
      <IconButton>
        <FaYoutube/>
      </IconButton>
      </Link>
      <IconButton onClick={toggleColorMode}>
      {colorMode === 'light' ? <FaMoon/> : <FaSun/>}
      </IconButton>
    </Flex>
  );
};

export default BottomBar;
