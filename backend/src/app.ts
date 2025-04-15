import express from 'express';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/api/test-db', async (req, res) => {
    const result = await pool.query('SELECT NOW()');
    res.json({ time: result.rows[0] });
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
