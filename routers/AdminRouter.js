const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const { addAdminValidation } = require('../middleware/validationMiddleware');
const { Authentication } = require('../middleware/authMiddleware');

router.post('/addAdmin', addAdminValidation, AdminController.addAdmin);

router.get('/getAdmin/:id', AdminController.getAdmin);

router.post('/updateAdmin', AdminController.updateAdmin);

router.get('/deleteAdmin', AdminController.deleteAdmin);

router.get('/destroyAdmin', AdminController.destroyAdmin);

router.get('/verifyAdmin/:token', Authentication('admin', 'url'), AdminController.verifyAdmin);


module.exports = router;