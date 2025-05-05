import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateProduct } from '../services/ProductService'

const EditProductPage: React.FC = () => {
    const { state: product } = useLocation();
    const navigate = useNavigate();

    const [form, setForm] = useState({ ...product });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateProduct(form.id, {
            ...form,
            quantity: Number(form.quantity_in_stock),
            threshold: Number(form.low_stock_threshold),
        });
        alert('Product updated');
        navigate('/dashboard');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Product</h2>
            <input name="name" value={form.name} onChange={handleChange} required />
            <input name="sku" value={form.sku} onChange={handleChange} required />
            <input name="unit" value={form.unit} onChange={handleChange} required />
            <input name="quantity_in_stock" type="number" value={form.quantity_in_stock} onChange={handleChange} required />
            <input name="low_stock_threshold" type="number" value={form.low_stock_threshold} onChange={handleChange} required />
            <input name="description" value={form.description} onChange={handleChange} />
            <button type="submit">Update</button>
        </form>
    );
};

export default EditProductPage;
