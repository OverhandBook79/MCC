import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import UploadPage from "./pages/UploadPage/UploadPage";
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
      <Route path="/uploadcreation" element={!authUser ? <AuthPage /> : <PageLayout><UploadPage /></PageLayout>} />
      <Route path="/post/:id" element={<PageLayout><PostPage /></PageLayout>} />
    </Routes>
  );
};

export default App;
