import React, { useState } from 'react';
import { addProduct } from '../../services/ProductService'

const AddProductForm: React.FC = () => {
    const [form, setForm] = useState({
        name: '',
        sku: '',
        unit: '',
        quantity: 0,
        threshold: 0,
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addProduct({
                ...form,
                quantity: Number(form.quantity),
                threshold: Number(form.threshold),
            });
            alert('Product added successfully');
        } catch (err) {
            console.error(err);
            alert('Error adding product');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Product</h2>
            <input name="name" placeholder="Name" onChange={handleChange} required />
            <input name="sku" placeholder="SKU" onChange={handleChange} required />
            <input name="unit" placeholder="Unit" onChange={handleChange} required />
            <input name="quantity" type="number" placeholder="Quantity" onChange={handleChange} required />
            <input name="threshold" type="number" placeholder="Low Stock Threshold" onChange={handleChange} required />
            <input name="description" placeholder="Description" onChange={handleChange} />
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProductForm;
