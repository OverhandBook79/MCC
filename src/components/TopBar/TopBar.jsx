import { Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Avatar, Box, Button, Flex, InputGroup, InputRightAddon, Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { IoSearch } from "react-icons/io5";

const TopBar = () => {
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleLogin = () => {
    // Simulate a login
    setUser({ name: 'Adolf Hitler', avatar: '' });
    onClose();
  };
  const switchAuthMode = () => {
    setIsSignUp(prev => !prev);
  };
  return (
    <Box>
    <Flex justifyContent="space-between" p={4} borderBottom="1px" borderColor="gray.200">
    <Text fontSize="2xl" fontWeight="bold">Yahaha</Text>
    <InputGroup>
    <Input placeholder='Search' />
    <InputRightAddon>
    <IoSearch />
    </InputRightAddon>
    </InputGroup>
    <Box>
      {user ? (
        <Button alignItems="center">
          <Avatar name={user.name} src={user.avatar} size="sm" cursor="pointer" onClick={() => navigate('/profile')} />
        </Button>
      ) : (
        <Button onClick={onOpen}>Login</Button>
      )}
    </Box>

    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isSignUp ? 'Sign Up' : 'Login'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="Email" mb={3} />
            <Input placeholder="Password" type="password" mb={3} />
            {isSignUp && <Input placeholder="Confirm Password" type="password" />}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleLogin}>
              {isSignUp ? 'Sign Up' : 'Login'}
            </Button>
            <Text>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"} 
              <Button variant="link" onClick={switchAuthMode}>
                {isSignUp ? 'Login' : 'Sign Up'}
              </Button>
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
  </Flex>
  </Box>
  )
}

export default TopBar