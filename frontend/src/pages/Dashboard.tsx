import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ProductsPage from './Product'

interface DashboardProps {
    user: {
        id: string;
        email: string;
        role?: string;
    } | null;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout')
            navigate('/login')
        } catch (err) {
            console.error('Logout failed', err);
            alert('Logout failed. Try again.');
        }
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user?.email}</p>
            <button onClick={handleLogout}>Logout</button>
            <hr />
            <button onClick={() => navigate('/add-product')}>
                Add Product
            </button>
        </div>
    );
};

export default Dashboard;
