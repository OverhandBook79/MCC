import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, VStack } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react'; 

import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import TopBar from './components/TopBar/TopBar';
import BottomBar from './components/BottomBar/BottomBar';
import AuthModal from './components/ProfileModal/AuthModal';
import AvatarModal from './components/ProfileModal/AvatarModal';
import ProfileEditModal from './components/ProfileModal/ProfileEditModal';
import UploadPage from "./pages/UploadPage/UploadPage";
import WorldsPage from "./pages/WorldPage/WorldsPage";
import AddonsPage from "./pages/AddonPage/AddonsPage";
import ServersPage from "./pages/ServerPage/ServersPage";
import SkinsPage from "./pages/SkinPage/SkinsPage";
import PostPage from "./pages/PostPage/PostPage";

const App = () => {
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '', avatar: '', bio: '' });
  const [tempAvatar, setTempAvatar] = useState('');
  const [tempBio, setTempBio] = useState('');
  const [tempUsername, setTempUsername] = useState('');

  // Use useDisclosure hook to manage modal states
  const { isOpen: isAuthModalOpen, onOpen: onAuthModalOpen, onClose: onAuthModalClose } = useDisclosure();
  const { isOpen: isAvatarModalOpen, onOpen: onAvatarModalOpen, onClose: onAvatarModalClose } = useDisclosure();
  const { isOpen: isBioModalOpen, onOpen: onBioModalOpen, onClose: onBioModalClose } = useDisclosure();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAuth = () => {
    if (isSignUp) {
      localStorage.setItem('user', JSON.stringify(formData));
      setUser(formData);
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.email === formData.email && storedUser.password === formData.password) {
        setUser(storedUser);
      } else {
        alert('Invalid credentials');
        return;
      }
    }
    onAuthModalClose(); // Close the authentication modal after login/signup
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const switchAuthMode = () => {
    setIsSignUp(prev => !prev);
  };

  const handleAvatarChange = () => {
    const updatedUser = { ...user, avatar: tempAvatar };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    onAvatarModalClose(); // Close the avatar modal after avatar change
  };

  const handleBioAndUsernameChange = () => {
    const updatedUser = { ...user, bio: tempBio, username: tempUsername };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    onBioModalClose(); // Close the profile edit modal after bio/username change
  };

  return (
    <>
        <Box position="fixed" top={0} left={0} width="100%" zIndex={1000}>
          <TopBar user={user} onLogin={onAuthModalOpen} onLogout={handleLogout} />
        </Box>
        <Box flex="1" mt="80px">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage user={user} onAvatarModalOpen={onAvatarModalOpen} onBioModalOpen={onBioModalOpen} />} />
            <Route path="/addons" element={<AddonsPage />} />
            <Route path="/worlds" element={<WorldsPage />} />
            <Route path="/skins" element={<SkinsPage />} />
            <Route path="/uploadcreation" element={<UploadPage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/servers" element={<ServersPage />} />
          </Routes>
        </Box>
        <Box position="sticky" bottom={0} zIndex={1}>
          <BottomBar />
        </Box>
        
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={onAuthModalClose} 
          isSignUp={isSignUp} 
          formData={formData} 
          handleInputChange={handleInputChange} 
          handleAuth={handleAuth} 
          switchAuthMode={switchAuthMode} 
        />

        <AvatarModal 
          isOpen={isAvatarModalOpen} 
          onClose={onAvatarModalClose} 
          tempAvatar={tempAvatar} 
          setTempAvatar={setTempAvatar} 
          handleAvatarChange={handleAvatarChange} 
        />

        <ProfileEditModal 
          isOpen={isBioModalOpen} 
          onClose={onBioModalClose} 
          tempBio={tempBio} 
          setTempBio={setTempBio} 
          tempUsername={tempUsername} 
          setTempUsername={setTempUsername} 
          handleBioAndUsernameChange={handleBioAndUsernameChange} 
        />
    </>
  );
};

export default App;
