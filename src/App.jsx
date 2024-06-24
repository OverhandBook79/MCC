import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Button, useDisclosure } from '@chakra-ui/react';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import HomePage from './pages/HomePage/HomePage';
import TopBar from './components/TopBar/TopBar';
import BottomBar from './components/BottomBar/BottomBar';


const App = () => {
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '', avatar: '' });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isAvatarModalOpen, onOpen: onAvatarModalOpen, onClose: onAvatarModalClose } = useDisclosure();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAuth = () => {
    if (isSignUp) {
      localStorage.setItem('user', JSON.stringify(formData));
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.email === formData.email && storedUser.password === formData.password) {
        setUser(storedUser);
      } else {
        alert('Invalid credentials');
        return;
      }
    }
    setUser(formData);
    onClose();
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const switchAuthMode = () => {
    setIsSignUp(prev => !prev);
  };

  const handleAvatarChange = (url) => {
    const updatedUser = { ...user, avatar: url };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    onAvatarModalClose();
  };

  return (
    <Box>
      <TopBar user={user} onLogin={onOpen} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage user={user} onAvatarModalOpen={onAvatarModalOpen} />} />
      </Routes>

      <BottomBar />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isSignUp ? 'Sign Up' : 'Login'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input 
                name="username" 
                placeholder="Username" 
                mb={3} 
                value={formData.username} 
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
              name="email" 
              placeholder="Email" 
              mb={3} 
              value={formData.email} 
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

      <Modal isOpen={isAvatarModalOpen} onClose={onAvatarModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Avatar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input 
              placeholder="New Avatar URL" 
              onChange={(e) => handleAvatarChange(e.target.value)} 
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => handleAvatarChange(formData.avatar)}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default App;
