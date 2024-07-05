import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';
import SignUp from './SignUp';
import SignIn from './SignIn';

const AuthModal = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const switchAuthMode = () => {
    setIsSignUp(prev => !prev);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isSignUp ? 'Sign Up' : 'Sign In'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isSignUp ? <SignUp/> : <SignIn/>}
        </ModalBody>
        <ModalFooter>
          <Button variant="link" onClick={switchAuthMode}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
