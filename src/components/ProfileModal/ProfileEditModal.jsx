// src/components/ProfileEditModal.jsx
import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Button } from '@chakra-ui/react';

const ProfileEditModal = ({ isOpen, onClose, tempBio, setTempBio, tempUsername, setTempUsername, handleBioAndUsernameChange }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input 
            placeholder="Username" 
            value={tempUsername}
            onChange={(e) => setTempUsername(e.target.value)}
            mb={3}
          />
          <Input 
            placeholder="Bio" 
            value={tempBio}
            onChange={(e) => setTempBio(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleBioAndUsernameChange}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileEditModal;
