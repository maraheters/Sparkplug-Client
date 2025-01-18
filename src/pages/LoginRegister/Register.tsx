import React, { useState } from 'react';
import styles from './LoginRegister.module.scss'
import { useAuth } from '../../auth/AuthContext';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null); 
    const {registerUser} = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null); 
        registerUser(username, password);
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
            <button className={styles.submitButton} type="submit">Register</button>
            <p>Already have an account? <a href="/login">Sign in here</a></p>
        </form>
        {error && <div className={styles.error}>{error}</div>} 
        </div>
    );
};

export default Register;