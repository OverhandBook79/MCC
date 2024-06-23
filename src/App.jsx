import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import AuthPage from './pages/AuthPage/AuthPage'
import TopBar from './components/TopBar/TopBar'
import BottomBar from './components/BottomBar/BottomBar'

function App() {
  return <>
    <TopBar/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/auth' element={<AuthPage/>}/>
    </Routes>
    <BottomBar/>
  </>
}

export default App