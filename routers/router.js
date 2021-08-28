const express = require('express');
const router = express.Router();
const CategoryRouter = require('../routers/CategoryRouter');
const ProductRouter = require('../routers/ProductRouter');
const UserRouter = require('../routers/UserRouter');
const AuthRouter = require('../routers/AuthRouter');
const AdminRouter = require('../routers/AdminRouter');


router.use('/categories', CategoryRouter);

router.use('/products', ProductRouter);

router.use('/users', UserRouter);

router.use('/auth', AuthRouter);

router.use('/admins', AdminRouter);


module.exports = router;