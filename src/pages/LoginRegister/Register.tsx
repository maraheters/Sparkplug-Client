import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginRegister.module.scss'

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null); 
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await fetch(`http://localhost:8080/users/register?username=${username}&password=${password}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }
            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('userId', data.userId);

            console.log('Registration successful');
            navigate('/');
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <div className={styles.registerFormContainer}>
        <form className={styles.registerForm} onSubmit={handleSubmit}>
            <h2>Register</h2>
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
            <button type="submit">Register</button>
            <p>Already have an account? <a href="/login">Sign in here</a></p>
        </form>
        {error && <div className={styles.error}>{error}</div>} 
        </div>
    );
};

export default Register;