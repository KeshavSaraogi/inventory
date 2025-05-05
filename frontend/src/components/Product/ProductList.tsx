// src/components/Product/ProductList.tsx
import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/ProductService'

interface Product {
    id: number;
    name: string;
    sku: string;
    unit: string;
    quantity_in_stock: number;
    low_stock_threshold: number;
    description: string;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const data = await getProducts();
            setProducts(data);
        };
        fetch();
    }, []);

    return (
        <div>
            <h2>All Products</h2>
            <table border={1} cellPadding={8}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Unit</th>
                        <th>Quantity</th>
                        <th>Threshold</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>{p.sku}</td>
                            <td>{p.unit}</td>
                            <td>{p.quantity_in_stock}</td>
                            <td>{p.low_stock_threshold}</td>
                            <td>
                                {p.quantity_in_stock < p.low_stock_threshold
                                    ? <span style={{ color: 'red' }}>Low Stock</span>
                                    : 'In Stock'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
