import React from 'react'
import { Button, useColorMode } from '@chakra-ui/react';
import { FaGithub, FaYoutube, FaMoon, FaSun  } from "react-icons/fa";

const BottomBar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
         <Button>
            <FaGithub/>
         </Button>
         <Button>
            <FaYoutube/>
         </Button>
      <Button onClick={toggleColorMode}>
      {colorMode === 'light' ? <FaMoon/> : <FaSun/>}
      </Button>
        </>
    );
  };

export default BottomBar