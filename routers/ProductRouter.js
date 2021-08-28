const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { productValidation } = require('../middleware/validationMiddleware');
const { Authentication } = require('../middleware/authMiddleware');

router.post('/addProduct', Authentication('admin'), productValidation, ProductController.addProduct);

router.get('/getProduct/:id', Authentication('both'), ProductController.getProduct);

router.post('/updateProduct', Authentication('admin'), productValidation, ProductController.updateProduct);

router.get('/deleteProduct/:id', Authentication('admin'), ProductController.deleteProduct);

router.get('/destroyProduct/:id', Authentication('admin'), ProductController.destroyProduct);

router.get('/', ProductController.getProducts);

router.get('/getSpecialProducts', Authentication('admin'), ProductController.getSpecialProducts);

router.get('/getProductWithPopulate/:id', Authentication('admin'), ProductController.getProductWithPopulate);

module.exports = router;