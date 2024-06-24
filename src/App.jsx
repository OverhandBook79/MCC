import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import TopBar from './components/TopBar/TopBar'
import BottomBar from './components/BottomBar/BottomBar'
import ProfilePage from './pages/ProfilePage/ProfilePage'

function App() {
  return <>
    <TopBar/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
    </Routes>
    <BottomBar/>
  </>
}

export default App