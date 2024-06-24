import React from 'react';
import { Box, Flex, Link, useColorMode } from '@chakra-ui/react';
import { FaGithub, FaYoutube, FaMoon, FaSun  } from "react-icons/fa";

const BottomBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex justifyContent="center" p={4} borderTop="1px" borderColor="gray.200" mt={4}>
      <Link href="https://github.com/OverhandBook79" isExternal>
        <FaGithub/>
      </Link>
      <Link href="https://youtube.com" isExternal>
        <FaYoutube/>
      </Link>
      <Box onClick={toggleColorMode}>
      {colorMode === 'light' ? <FaMoon/> : <FaSun/>}
      </Box>
    </Flex>
  );
};

export default BottomBar;
