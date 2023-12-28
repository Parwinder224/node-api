const express =require('express');
// const Product = require('../models/productModel');
const { getProducts, getProductByID, addNewProduct, updateProduct, deleteProduct } = require('../controllers/productController');

const router =express.Router();


router.get('/', getProducts)


router.get('/:id',getProductByID)

router.put('/:id', updateProduct)

router.delete('/:id', deleteProduct)

router.post('/', addNewProduct)

module.exports =router;