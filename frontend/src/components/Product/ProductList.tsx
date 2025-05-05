import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../services/ProductService'

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
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                console.error('Failed to fetch products', err);
            }
        };

        fetchProducts();
    }, []);

    const handleEdit = (product: Product) => {
        navigate(`/edit-product/${product.id}`, { state: product });
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await deleteProduct(id);
            const updatedProducts = await getProducts();
            setProducts(updatedProducts);
        } catch (err) {
            console.error('Failed to delete product', err);
        }
    };

    return (
        <div>
            <h2>Product List</h2>
            <table border={1} cellPadding={8}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Unit</th>
                        <th>Quantity</th>
                        <th>Threshold</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>{p.sku}</td>
                            <td>{p.unit}</td>
                            <td>{p.quantity_in_stock}</td>
                            <td>{p.low_stock_threshold}</td>
                            <td>
                                {p.quantity_in_stock < p.low_stock_threshold ? (
                                    <span style={{ color: 'red' }}>Low Stock</span>
                                ) : (
                                    'In Stock'
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleEdit(p)}>Edit</button>
                                <button onClick={() => handleDelete(p.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;