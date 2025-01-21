import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './LoginRegister.module.scss'
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null); 
    const {loginUser} = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null); 
        loginUser(username, password);
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