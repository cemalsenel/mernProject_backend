const Product = require('../models/Product');
const { validationResult } = require('express-validator');
const checkFunction = require('../helpers/checkFunction');
const sendData = require('../helpers/sendData');

exports.addProduct = async (req, res) => {
    try {

        const { productName } = req.body;

        //field validation
        const validationErr = validationResult(req);
        checkFunction(res, validationErr?.errors?.length > 0, validationErr.array());

        // product exist check
        const existProduct = await Product.findOne({ productName: productName });
        checkFunction(res, existProduct, "Product already exist");

        //save product
        let product = new Product(req.body);
        product = await product.save({ new: true });
        sendData(res, product);
    }
    catch (err) {
        checkFunction(res, err, err.message, 500)
    }
}

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById({ _id: req.params.id })
        sendData(res, product);
    }
    catch (err) {
        checkFunction(res, err, err.message);
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.body;

        // field validation
        const validationErr = validationResult(req);
        checkFunction(res, validationErr?.errors?.length > 0, validationErr.array());

        // update
        let updatedProduct = await Product.findOneAndUpdate(
            { _id: id },
            {
                ...req.body,
                status: 'updated',
            },
            {
                new: true,
            }
        );
        sendData(res, updatedProduct);
    }
    catch (err) {
        checkFunction(res, err, err.message, 500);
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findOneAndUpdate(
            { _id: req.params.id },
            {
                status: 'deleted',
                deletedAt: Date.now(),
            },
            {
                new: true,
            }
        );

        sendData(res, "Data is deleted");
    }
    catch (err) {
        checkFunction(res, err, err.message, 500)
    }
}

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().where('status', /[^deleted]/i).select('-password');
        sendData(res, products);
    }
    catch (err) {
        checkFunction(res, err, err.message, 500)
    }
}

exports.destroyProduct = async (req, res) => {
    try {
        await Product.deleteOne({ _id: req.params.id });
        sendData(res, "Data is destroyed");
    }
    catch (err) {
        checkFunction(res, err, err.message, 500)
    }
}

exports.getSpecialProducts = async (req, res) => {
    Product.find({ productName: /^[com]/ }, (err, products) => {
        if (err) return console.error(err);
        sendData(res, products);

    })
}

exports.getProductWithPopulate = async (req, res) => {
    try {
        // const productList = await Product.findOne({ _id: req.params.id }).populate('category');
        const productList = await Product.findOne({ _id: req.params.id })
            .populate('category', '-status, -__v, -_id').select('-status, -__v, -_id')
        sendData(res, productList);

    } catch (err) {
        checkFunction(res, err, err.message, 500)
    }
}