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
import { AuthProvider } from './auth/AuthContext'
import Logout from './pages/Logout'

import {Toaster} from 'react-hot-toast'
import Layout from './Layout'
import ProtectedRoute from './auth/ProtectedRoute'

function App() {

    return (
        <>
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Routes with standard layout */}
                    <Route path='/' element={<Layout />}> 
                        <Route index element={<Home />} />
                        <Route path="news" element={<News />} />
                        <Route path="postings/:postingId" element={<PostInfoPage />} />

                        {/* Protected routes */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="profile" element={<Profile />} />
                            <Route path="/upload" element={<Upload />} />
                            <Route path="edit-posting/:postingId" element={<UpdatePosting />} />
                        </Route>
                    </Route>

                    {/* Routes without standard layout */}
                    
                    {/* Protected Routes */}
                    {/* <Route element={<AuthIsSignedIn />}> */}
                        <Route path="/logout" element={<Logout />} />
                    {/* </Route> */}

                    {/* Unprotected Routes */}
                    {/* <Route element={<AuthIsNotSignedIn />}> */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    {/* </Route> */}

                </Routes>
            </AuthProvider>
        </Router>

            <Toaster 
                position='bottom-right'/>
        </>
    )
}

export default App
