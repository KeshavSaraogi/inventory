import { Request, Response } from 'express';
import {
    getAllProducts, getProductById, createProduct,
    updateProduct, deleteProduct } 
from '../models/product'

export const fetchProducts = async (req: Request, res: Response) => {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (err: any) {
        console.error('❌ fetchProducts error:', err.message || err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

export const fetchProduct = async (req: Request, res: Response) => {
    try {
        const product = await getProductById(Number(req.params.id));
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

export const addProduct = async (req: Request, res: Response) => {
    try {
        const { name, sku, unit, quantity, threshold, description } = req.body;
        const newProduct = await createProduct(name, sku, unit, quantity, threshold, description);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create product' });
    }
};

export const modifyProduct = async (req: Request, res: Response) => {
    try {
        const { name, sku, unit, quantity, threshold, description } = req.body;
        const updated = await updateProduct(Number(req.params.id), name, sku, unit, quantity, threshold, description);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update product' });
    }
};

export const removeProduct = async (req: Request, res: Response) => {
    try {
        await deleteProduct(Number(req.params.id));
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};
