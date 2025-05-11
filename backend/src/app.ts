import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import pool from '../src/db'
import dashboardRoutes from './routes/dashboard.routes';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
    throw new Error('SESSION_SECRET must be defined in .env');
}

app.use(
    session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
);

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
    console.log('GET / was called');
    res.send('Hello World!');
});

const startServer = async () => {
    console.log("🔁 Attempting to start server...");
    try {
        await pool.query('SELECT NOW()');
        console.log('✅ Connected to the database successfully');

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });

    } catch (err: any) {
        console.error('❌ Failed to connect to the database:', err.message || err);
        process.exit(1);
    }
};

startServer();

export default app;
