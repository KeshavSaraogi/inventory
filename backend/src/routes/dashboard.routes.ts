import express from 'express';
import { fetchDashboardSummary } from '../controllers/dashboard.controller';

const router = express.Router();

router.get('/summary', fetchDashboardSummary);

export default router;
