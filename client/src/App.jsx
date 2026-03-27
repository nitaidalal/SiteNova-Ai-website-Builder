import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { useGetUserProfile } from './hooks/getUserProfile'

const App = () => {
  const { theme } = useSelector((state) => state.theme)
  const { isAuthenticated } = useSelector((state) => state.user)

  // Fetch user profile on app mount
  useGetUserProfile();

  // Set the initial theme on app load
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          top: 60,
        }}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#ffffff",
            color: "#1f2937",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "16px",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            fontSize: "14px",
            fontWeight: "500",
          },
          success: {
            duration: 3000,
            style: {
              background: "#d1fae5",
              color: "#065f46",
              border: "1px solid #10b981",
            },
            iconTheme: {
              primary: "#10b981",
              secondary: "#ffffff",
            },
          },
          error: {
            duration: 4000,
            style: {
              background: "#fee2e2",
              color: "#7f1d1d",
              border: "1px solid #ef4444",
            },
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
          loading: {
            style: {
              background: "#dbeafe",
              color: "#1e3a8a",
              border: "1px solid #3b82f6",
            },
            iconTheme: {
              primary: "#3b82f6",
              secondary: "#ffffff",
            },
          },
        }}
      />
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? <Home /> :<Home/> 
          }
        />
        {/* <Route path="/auth" element={isAuthenticated ? <Navigate to="/" replace /> : <Auth />} /> */}
      </Routes>
    </>
  );
}

export default App
