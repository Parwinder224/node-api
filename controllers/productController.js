const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler')
//  get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
        res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// get product by id
const getProductByID = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product);
         res.set({
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT,OPTIONS'
    });
    } catch (error) {
        // res.status(500).json({ message: error.message })
        res.status(500);
        throw new Error(error.message)
    }
})

// add product
const addNewProduct = async (req, res) => {
    // console.log(req.body)
    // res.send(req.body)
    try {
        const products = await Product.create(req.body);
        res.status(200).json(products);
        res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
}

// update product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product) {
            res.status(404).json({ message: `cannot find product with id ${id}` })
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct);
        res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

// delete product 
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id, req.body)
        if (!product) {
            res.status(404).json({ message: `cannot find product with id ${id}` })
        }
        // const updateProduct= await Product.findById(id);
        res.status(200).json(product);
        res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}
module.exports = {
    getProducts,
    getProductByID,
    addNewProduct,
    updateProduct,
    deleteProduct
}
