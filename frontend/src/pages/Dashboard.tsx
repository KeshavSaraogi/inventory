import { useNavigate } from 'react-router-dom'
import api from '../services/api'

function Dashboard() {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout')
            console.log('Logout Successful')
            navigate('/login')
        } catch (error) {
            console.log('Logout Failed', error)
            alert('Logout Failed. Try Again.')
        }
    }

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Welcome to the Dashboard!</h1>
            <button onClick={handleLogout} style={{ marginTop: '2rem' }}>
                Logout
            </button>
        </div>
    );
}

export default Dashboard;
