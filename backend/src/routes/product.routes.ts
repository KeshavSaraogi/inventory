import express from 'express';
import {
    fetchProducts,
    fetchProduct,
    addProduct,
    modifyProduct,
    removeProduct,
} from '../controllers/product.controller';

const router = express.Router();

router.get('/', fetchProducts);
//router.get('/:id', fetchProduct);
router.post('/', addProduct);
router.put('/:id', modifyProduct);
router.delete('/:id', removeProduct);

export default router;