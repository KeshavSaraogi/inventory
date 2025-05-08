// src/db/dashboard.ts
import pool from './db';

export const getDashboardSummary = async () => {
    const result = await pool.query(`
    SELECT
      COUNT(*) AS total_products,
      COALESCE(SUM(quantity_in_stock), 0) AS total_quantity,
      COUNT(*) FILTER (
        WHERE quantity_in_stock < low_stock_threshold
      ) AS low_stock_count
    FROM products
  `);

    return {
        totalProducts: parseInt(result.rows[0].total_products, 10),
        totalQuantity: parseInt(result.rows[0].total_quantity, 10),
        lowStockCount: parseInt(result.rows[0].low_stock_count, 10),
    };
};
