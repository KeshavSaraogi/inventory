import React from 'react';
import ProductList from '../components/Product/ProductList';
import AddProductForm from '../components/Product/AddProductForm';

const ProductsPage: React.FC = () => {
    return (
        <div>
            <AddProductForm />
            <hr />
            <ProductList />
        </div>
    );
};

export default ProductsPage;