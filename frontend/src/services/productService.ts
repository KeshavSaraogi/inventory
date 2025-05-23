import axios from 'axios';

const API_URL = 'http://localhost:5050/api/products';

export const getProducts = async () => {
    const res = await axios.get(API_URL, { withCredentials: true });
    return res.data;
};

export const addProduct = async (product: {
    name: string;
    sku: string;
    unit: string;
    quantity: number;
    threshold: number;
    description: string;
}) => {
    const res = await axios.post(API_URL, product, { withCredentials: true });
    return res.data;
};

export const updateProduct = async (
    id: number,
    product: {
        name: string;
        sku: string;
        unit: string;
        quantity: number;
        threshold: number;
        description: string;
    }
) => {
    const res = await axios.put(`${API_URL}/${id}`, product, { withCredentials: true });
    return res.data;
};

export const deleteProduct = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
};
