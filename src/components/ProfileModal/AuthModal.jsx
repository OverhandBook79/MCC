// src/components/AuthModal.jsx
import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Button } from '@chakra-ui/react';

const AuthModal = ({ isOpen, onClose, isSignUp, formData, handleInputChange, handleAuth, switchAuthMode }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isSignUp ? 'Sign Up' : 'Login'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input 
            name="email" 
            placeholder="Email" 
            mb={3} 
            value={formData.email} 
            onChange={handleInputChange} 
          />
          <Input 
            name="password" 
            placeholder="Password" 
            type="password" 
            mb={3} 
            value={formData.password} 
            onChange={handleInputChange} 
          />
          {isSignUp && (
            <Input 
              name="username" 
              placeholder="Username" 
              mb={3} 
              value={formData.username} 
              onChange={handleInputChange} 
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAuth}>
            {isSignUp ? 'Sign Up' : 'Login'}
          </Button>
          <Button variant="link" onClick={switchAuthMode}>
            {isSignUp ? 'Login' : 'Sign Up'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
