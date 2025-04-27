import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import pool from '../db';

export const register = async (req: Request, res: Response) => {
    try {
        const { fullName, email, password, role } = req.body;

        if (!fullName || !email || !password) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }

        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            res.status(400).json({ message: 'Email already in use' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            'INSERT INTO users (full_name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, email, role',
            [fullName, email, hashedPassword, role || 'STAFF']
        );

        req.session.user = {
            id: newUser.rows[0].id,
            role: newUser.rows[0].role,
        };

        res.status(201).json({
            message: 'User registered successfully',
            user: newUser.rows[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Registration failed' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }

        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const match = await bcrypt.compare(password, user.rows[0].password);
        if (!match) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }

        req.session.user = {
            id: user.rows[0].id,
            role: user.rows[0].role,
        };

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.rows[0].id,
                email: user.rows[0].email,
                role: user.rows[0].role,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Login failed' });
    }
};
