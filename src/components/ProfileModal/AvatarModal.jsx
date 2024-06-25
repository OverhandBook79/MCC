// src/components/AvatarModal.jsx
import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Button } from '@chakra-ui/react';

const AvatarModal = ({ isOpen, onClose, tempAvatar, setTempAvatar, handleAvatarChange }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change Avatar</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input 
            placeholder="New Avatar URL" 
            value={tempAvatar}
            onChange={(e) => setTempAvatar(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleAvatarChange}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AvatarModal;
