import { useState } from 'react'
import NavBar from './components/NavBar'
import { ThemeProvider } from './components/theme-provider'
import './App.css'
import LoadMore from './components/LoadMore'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import  Login from './components/Login'
import  Register from './components/Register'
import Goals from './components/Goals'

function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
    <Router>
    <ThemeProvider defaultTheme="system" storageKey="my-app-theme">
    <div className="bg-background text-foreground">
      <NavBar />
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/" element={<LoadMore />} />
        </Routes>
      
      </div>
      </ThemeProvider>
      </Router>
    </>
  )
}

export default App
