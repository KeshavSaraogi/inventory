// src/controllers/dashboardController.ts
import { Request, Response } from 'express';
import { getDashboardSummary } from '../dashboard';

export const fetchDashboardSummary = async (req: Request, res: Response) => {
    try {
        const summary = await getDashboardSummary();
        res.json(summary);
    } catch (err) {
        console.error('Dashboard summary error:', err);
        res.status(500).json({ error: 'Failed to fetch dashboard summary' });
    }
};
