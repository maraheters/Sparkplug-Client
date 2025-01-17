// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import PostInfoPage from './pages/PostInfoPage'
import News from './pages/News'
import Upload from './pages/Upload/Upload'
import Login from './pages/LoginRegister/Login'
import Register from './pages/LoginRegister/Register'
import Profile from './pages/Profile/Profile'
import UpdatePosting from './pages/UpdatePosting/UpdatePosting'
import AuthProvider, { AuthIsNotSignedIn, AuthIsSignedIn } from './auth/AuthContext'
import Logout from './pages/Logout'

function App() {

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/postings/:postingId" element={<PostInfoPage />} />
                    
                    {/* Protected Routes */}
                    <Route element={<AuthIsSignedIn />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/upload" element={<Upload />} />
                        <Route path="/edit-posting/:postingId" element={<UpdatePosting />} />
                    </Route>

                    {/* Unprotected Routes */}
                    <Route element={<AuthIsNotSignedIn />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App
