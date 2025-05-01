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
            const loginRes = await api.post('/auth/login', {
                email,
                password,
            });

            console.log('Login successful', loginRes.data);

            const res = await api.get('/auth/me');
            const user = res.data.user;

            console.log('Authenticated user:', user);
            navigate('/dashboard');

        } catch (err: any) {
            console.error('Login failed', err);
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
