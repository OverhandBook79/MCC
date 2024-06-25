import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import TopBar from './components/TopBar/TopBar';
import BottomBar from './components/BottomBar/BottomBar';
import AuthModal from './components/ProfileModal/AuthModal';
import AvatarModal from './components/ProfileModal/AvatarModal';
import ProfileEditModal from './components/ProfileModal/ProfileEditModal';
import { useDisclosure } from '@chakra-ui/react'; // Import useDisclosure from Chakra UI

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
    <Box>
      <TopBar user={user} onLogin={onAuthModalOpen} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage user={user} onAvatarModalOpen={onAvatarModalOpen} onBioModalOpen={onBioModalOpen} />} />
      </Routes>

      <BottomBar />

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
    </Box>
  );
};

export default App;
