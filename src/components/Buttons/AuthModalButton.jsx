import React from 'react';
import AuthModal from '../ProfileModal/AuthModal';
import { Button, useDisclosure } from '@chakra-ui/react';

const AuthModalButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button w="100%" onClick={onOpen}>Register</Button>
      <AuthModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

export default AuthModalButton;
