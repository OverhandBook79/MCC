import React from 'react'
import { Route, Router } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import AuthPage from './pages/AuthPage/AuthPage'

function App() {
  return <>
    <Router>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/auth' element={<AuthPage/>}/>
    </Router>
  </>
}

export default App