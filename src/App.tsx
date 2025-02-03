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
import { AuthProvider } from './context/AuthContext'
import Logout from './pages/Logout'

import {Toaster} from 'react-hot-toast'
import Layout from './Layout'
import ProtectedRoute from './ProtectedRoute'
import { WishlistProvider } from './context/WishlistContext'
import Chats from './pages/Chats/Chats'
import { StompSessionProvider } from 'react-stomp-hooks'
import { ChatsProvider } from './context/ChatsContext'
import ProfileEdit from './pages/ProfileEdit/ProfileEdit'

function App() {

    return (
        <>
        <Router>
            <AuthProvider>
            <WishlistProvider>
            <StompSessionProvider url='http://localhost:8080/ws'>
            <ChatsProvider>
                <Routes>
                    {/* Routes with standard layout */}
                    <Route path='/' element={<Layout />}> 
                        <Route index element={<Home />} />
                        <Route path="news" element={<News />} />
                        <Route path="postings/:postingId" element={<PostInfoPage />} />

                        {/* Protected routes */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="profile" element={<Profile />} />
                            <Route path="profile/edit" element={<ProfileEdit />} />
                            <Route path="upload" element={<Upload />} />
                            <Route path="chats" element={<Chats/>} />
                            <Route path="edit-posting/:postingId" element={<UpdatePosting />} />
                        </Route>
                    </Route>

                    {/* Routes without standard layout */} 
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                   
                </Routes>
            </ChatsProvider>
            </StompSessionProvider>
            </WishlistProvider>
            </AuthProvider>
        </Router>

            <Toaster 
                position='bottom-right'
                toastOptions={{
                    className: '',
                    style: {
                        border: '1px solid var(--accent-color)',
                        padding: '16px',
                        color: 'black',
                        borderRadius: '0',
                        boxShadow: '4px 4px var(--box-shadow)'
                    },
                    error: {
                        iconTheme: {
                            primary: 'var(--accent-color)',
                            secondary: 'white',
                        },
                    },
                    success: {
                        iconTheme: {
                            primary: 'white',
                            secondary: 'var(--accent-color)',
                        },
                    },
                  }}/>
        </>
    )
}

export default App
