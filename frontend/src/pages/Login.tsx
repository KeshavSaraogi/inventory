import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });
            console.log('Login successful', response.data);

            const me = await api.get('/auth/me');
            console.log('Session confirmed:', me.data);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed', error);
            alert('Login failed. Check email or password.');
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label><br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginTop: '1rem' }}>
                    <label>Password:</label><br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" style={{ marginTop: '1rem' }}>
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
