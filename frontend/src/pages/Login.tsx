import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/login.css';

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
        <div className="login-container">
            <div className="login-card">
                <div className="login-left">
                    {/* Add your logo image below or use text */}
                    <img src="/logo.png" alt="Logo" />
                </div>
                <div className="login-right">
                    <h2 className="login-title">Log in to your account</h2>
                    <p className="login-subtitle">Welcome back! Please enter your details.</p>

                    <form onSubmit={handleSubmit} className="login-form">
                        <div>
                            <label className="login-label" htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="login-label" htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="login-checkbox">
                            <label>
                                <input type="checkbox" /> Remember for 30 days
                            </label>
                            <a href="#" style={{ color: "#2563eb", textDecoration: "underline" }}>Forgot password</a>
                        </div>

                        <div className="login-actions">
                            <button type="submit" className="w-full">Sign in</button>
                            <button type="button" className="w-full" style={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }}>
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: 16, marginRight: 8 }} />
                                Sign in with Google
                            </button>
                        </div>

                        <p className="login-link-text">
                            Don’t have an account?
                            <a href="/signup" className="login-link"> Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
