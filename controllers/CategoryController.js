const Category = require('../models/Category');
const { validationResult } = require('express-validator');
const checkFunction = require('../helpers/checkFunction');
const sendData = require('../helpers/sendData');

exports.addCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;

        //Field Validation
        const validationErr = validationResult(req);
        checkFunction(res, validationErr?.errors?.length > 0, validationErr.array());

        // category exist check
        const existCategory = await Category.findOne({ categoryName: categoryName });
        checkFunction(res, existCategory, "Category is already exists");

        //save category
        let category = new Category(req.body);
        category = await category.save({ new: true });
        sendData(res, category);
    }
    catch (err) {
        checkFunction(res, err, err.message)
    }

}

exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findById({ _id: req.params.id })
        sendData(res, category);
    }
    catch (err) {
        checkFunction(res, err, err.message, 500)
    }
}

exports.updateCategory = async (req, res) => {
    try {
        //field validation
        const validationErr = validationResult(req);
        checkFunction(res, validationErr?.errors?.length > 0, validationErr.array());

        // update
        const { id, categoryName, description, products } = req.body;
        let updatedCategory = await Category.findOneAndUpdate(
            { _id: id },
            {
                categoryName,
                description,
                status: 'updated',
                $push: {
                    products: products
                }
            },
            { new: true, }
        );
        sendData(res, updatedCategory);
    }
    catch (err) {
        checkFunction(res, err, err.message, 500)
    }

}

exports.deleteCategory = async (req, res) => {
    try {
        let deletedCategory = await Category.findOneAndUpdate(
            { _id: req.params.id },
            {
                status: 'deleted',
                deletedAt: Date.now(),
            },
            { new: true }
        );
        sendData(res, deletedCategory);
    }
    catch (err) {
        checkFunction(res, err, err.message, 500)
    }

}

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).where('status', /[^deleted]/i).select('-password');
        sendData(res, categories);
    }
    catch (err) {
        checkFunction(res, err, err.message, 500)
    }
}

exports.destroyCategory = async (req, res) => {
    try {
        await Category.deleteOne({ _id: req.params.id });
        sendData(res, 'Data is deleted');
    }
    catch (err) {
        checkFunction(res, err, err.message, 500)
    }
}