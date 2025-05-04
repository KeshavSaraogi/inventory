// src/routes/productRoutes.ts
import express from 'express';
import { fetchProducts, addProduct } from '../controllers/productController';
import { isAdmin } from '../middleware/isAdmin';

const router = express.Router();

router.get('/', isAdmin, fetchProducts);
router.post('/', isAdmin, addProduct);

export default router;
