// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import PostInfoPage from './pages/PostInfoPage'
import News from './pages/News'
import Upload from './pages/Upload'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import ProtectedRoute from './auth/ProtectedRoute'
import { AuthProvider } from './auth/AuthContext'

function App() {

    return (
        <AuthProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/postings/:postingId" element={<PostInfoPage/>} />
                <Route path="/news" element={<News/>} />
                <Route path="/upload" element={<Upload/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route 
                    path="/profile" 
                    element={
                        // <ProtectedRoute>
                            <Profile />
                        // </ProtectedRoute>
                    } 
                />
            </Routes>
        </Router>
        </AuthProvider>
    )
}

export default App
