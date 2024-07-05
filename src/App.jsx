import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import UploadPage from "./pages/UploadPage/UploadPage";
import WorldsPage from "./pages/WorldPage/WorldsPage";
import AddonsPage from "./pages/AddonPage/AddonsPage";
import ServersPage from "./pages/ServerPage/ServersPage";
import SkinsPage from "./pages/SkinPage/SkinsPage";
import PostPage from "./pages/PostPage/PostPage";
import PageLayout from './Layouts/PageLayout/PageLayout';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import AuthPage from './pages/AuthPage/AuthPage';

const App = () => {
  const [authUser] = useAuthState(auth);
  return (
    <Routes>
      <Route path="/guest" element={authUser ? <PageLayout><Navigate to='/'/></PageLayout> : <AuthPage/>} />
      <Route path="/" element={<PageLayout><HomePage /></PageLayout>} />
      <Route path="/:username" element={<PageLayout><ProfilePage /></PageLayout>} />
      <Route path="/addons" element={<PageLayout><AddonsPage /></PageLayout>} />
      <Route path="/worlds" element={<PageLayout><WorldsPage /></PageLayout>} />
      <Route path="/skins" element={<PageLayout><SkinsPage /></PageLayout>} />
      <Route path="/uploadcreation" element={!authUser ? <AuthPage /> : <PageLayout><UploadPage /></PageLayout>} />
      <Route path="/post/:id" element={<PageLayout><PostPage /></PageLayout>} />
      <Route path="/servers" element={<PageLayout><ServersPage /></PageLayout>} />
    </Routes>
  );
};

export default App;
