import express from 'express';
import { login, register } from '../controllers/auth.controller';
import { isAuthenticated } from '../middlewares/authenticated';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: 'Logout failed' });
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Logged out' });
    });
});
router.get('/me', isAuthenticated, (req, res) => {
    res.status(200).json({ user: req.session.user });
});

export default router;