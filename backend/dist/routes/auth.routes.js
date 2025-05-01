"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const authenticated_1 = require("../middlewares/authenticated");
const router = express_1.default.Router();
router.post('/login', auth_controller_1.login);
router.post('/register', auth_controller_1.register);
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err)
            return res.status(500).json({ message: 'Logout failed' });
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Logged out' });
    });
});
router.get('/me', authenticated_1.isAuthenticated, (req, res) => {
    res.status(200).json({ user: req.session.user });
});
exports.default = router;
