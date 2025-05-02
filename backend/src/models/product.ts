import pool from '../db';

export const getAllProducts = async () => {
    const res = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    return res.rows;
};

export const getProductById = async (id: number) => {
    const res = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return res.rows[0];
};

export const createProduct = async (
    name: string,
    sku: string,
    unit: string,
    quantity: number,
    threshold: number,
    description: string
) => {
    const res = await pool.query(
        `INSERT INTO products (name, sku, unit, quantity_in_stock, low_stock_threshold, description)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
        [name, sku, unit, quantity, threshold, description]
    );
    return res.rows[0];
};
