import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface LoginProps {
    setUser: React.Dispatch<React.SetStateAction<{
        id: string;
        email: string;
        role?: string;
    } | null>>;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/auth/login', { email, password });
            const res = await api.get('/auth/me');
            setUser(res.data.user);
            navigate('/dashboard');
        } catch (err: any) {
            console.error('Login failed', err);
            alert('Invalid credentials or network error.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            /><br />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            /><br />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
