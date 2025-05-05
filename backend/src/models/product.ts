import pool from '../db'

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
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [name, sku, unit, quantity, threshold, description]
    );
    return res.rows[0];
};

export const updateProduct = async (
    id: number,
    name: string,
    sku: string,
    unit: string,
    quantity: number,
    threshold: number,
    description: string
) => {
    const res = await pool.query(
        `UPDATE products SET name = $1, sku = $2, unit = $3, quantity_in_stock = $4,
     low_stock_threshold = $5, description = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *`,
        [name, sku, unit, quantity, threshold, description, id]
    );
    return res.rows[0];
};

export const deleteProduct = async (id: number) => {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
};