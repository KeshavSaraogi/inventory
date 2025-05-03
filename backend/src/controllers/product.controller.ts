// src/controllers/productController.ts
import { Request, Response } from 'express';
import { getAllProducts, getProductById, createProduct } from '../db/product';

export const fetchProducts = async (req: Request, res: Response) => {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

export const addProduct = async (req: Request, res: Response) => {
    try {
        const { name, sku, unit, quantity, threshold, description } = req.body;
        const newProduct = await createProduct(name, sku, unit, quantity, threshold, description);
        res.status(201).json(newProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create product' });
    }
};
