const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const validations = require('../middleware/validationMiddleware')

router.post('/addCategory', validations.categoryValidation, CategoryController.addCategory);

router.get('/getCategory/:id', CategoryController.getCategory);

router.post('/updateCategory', validations.categoryValidation, CategoryController.updateCategory);

router.get('/deleteCategory/:id', CategoryController.deleteCategory);

router.get('/destroyCategory/:id', CategoryController.destroyCategory);

router.get('/', CategoryController.getCategories);

module.exports = router;
