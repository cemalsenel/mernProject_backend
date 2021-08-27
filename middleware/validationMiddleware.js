const { check } = require("express-validator");

exports.categoryValidation = [
    check('categoryName', "Category Name must be min 2 chars and max 20 chars").isLength({min:2, max:20}),
    check('description', "Please enter max 200 chars").isLength({max:200}),
]