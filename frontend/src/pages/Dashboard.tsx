import React from 'react';

interface DashboardProps {
    user: {
        id: string;
        email: string;
        role?: string;
    } | null;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user?.email}</p>
        </div>
    );
};

export default Dashboard;
