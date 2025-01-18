import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginRegister.module.scss'
import toast from 'react-hot-toast';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null); 
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null); 

        try {
            const response = await fetch(`http://localhost:8080/auth/login?username=${username}&password=${password}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            localStorage.setItem('authToken', data.authToken);
            localStorage.setItem('username', data.username);
            localStorage.setItem('userId', data.id);

            console.log('Login successful:', data);
            navigate('/'); 
            toast("Welcome");
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Invalid username or password. Please try again.');
        }
    };

    return (
        <div className={styles.loginFormContainer}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <h2 className={styles.heading}>Sign in</h2>
            <div>
                <input 
                    type="text" 
                    placeholder="Username"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <input 
                    type="password" 
                    placeholder="Password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            </div>
            <button className={styles.submitButton} type="submit">Login</button>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </form>
        {error && <div className={styles.error}>{error}</div>} 
        </div>
    );
};

export default Login;