import React,{useEffect} from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import  { useSelector } from 'react-redux'

const App = () => {
  const {theme} = useSelector((state) => state.theme)
  const {isAuthenticated} = useSelector((state) => state.auth)

  // Set the initial theme on app load
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);


  return (
    <Routes>
      <Route path="/" element={!isAuthenticated ? <Home /> : <Navigate to="/auth" replace />} />
      {/* <Route path="/auth" element={isAuthenticated ? <Navigate to="/" replace /> : <Auth />} /> */}
    </Routes>
  )
}

export default App
