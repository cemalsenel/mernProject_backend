const { check } = require('express-validator');

exports.categoryValidation = [
    check('categoryName', 'Please enter a name minumum 2 and maximum 20 chars').isLength({ min: 2, max: 20 }),
    check('description', 'Please enter a description maximum 300 chars').isLength({ max: 300 }),
]

exports.productValidation = [
    check('productName', 'Please enter a name minumum 2 and maximum 20 chars').isLength({ min: 2, max: 20 }),
    check('description', 'Please enter a description maximum 300 chars').isLength({ max: 300 }),
]

exports.userValidation = [
    check('firstName', 'Please enter a name minumum 2 and maximum 20 chars').isLength({ min: 2, max: 20 }),
    check('lastName', 'Please enter a name minumum 2 and maximum 20 chars').isLength({ min: 2, max: 20 }),
    check('password', 'Please enter a password minumum 8 chars').isLength({ min: 6 }),
    check('email', 'Please enter a password maximum minumum 8 chars').isEmail().isLength({ min: 8 }),
]

exports.loginValidation = [
    check('email', 'Please enter a valid e-mail').isEmail(),
    check('password', 'Please enter a valid password').isLength({ min: 6 }),
]

exports.addAdminValidation = [
    check('firstName', 'Please enter a valid first name').isLength({ min: 3, max: 40 }),
    check('email', 'Please enter a valid e-mail').isEmail(),
    check('lastName', 'Please enter a valid last name').isLength({ min: 2, max: 40 }),
]



