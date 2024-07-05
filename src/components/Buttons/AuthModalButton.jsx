import React from 'react'
import AuthModal from '../ProfileModal/AuthModal';
import { Button, useDisclosure } from '@chakra-ui/react';

const AuthModalButton = () => {
  const { isOpen } = useDisclosure();
    return (
        <>
            <Button w="100%" onClick={isOpen}>Register</Button>
            <AuthModal
                isOpen={isAuthModalOpen}
            />
        </>
    )
}

export default AuthModalButton