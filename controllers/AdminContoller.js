const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const { validationResult } = require('express-validator');
const checkFunction = require('../helpers/checkFunction');
const sendData = require('../helpers/sendData');
const sendMail = require('../helpers/sendMail');
const verifyMail = require('../helpers/verifyMail');

exports.addAdmin = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // field validation
        const validationErr = validationResult(req);
        checkFunction(res, validationErr?.errors?.length > 0, validationErr.array());

        // admin exist check
        const existAdmin = await Admin.findOne({ email });
        checkFunction(res, existAdmin, "Admin already exists!!");

        // hash password
        const salt = await bcrypt.genSalt(5);
        const newPassword = await bcrypt.hash(password, salt);

        // save admin
        let admin = new Admin({
            firstName,
            lastName,
            email,
            password: newPassword,
        });

        admin = await admin.save({ new: true });

        // Json web token
        jwt.sign(
            { admin, role: 'admin' },
            process.env.JWT_SECRET_KEY,
            { expiresIn: 3600 },
            (err, token) => {
                if (err) console.log(err.message);
                sendMail(admin.email, "Register", "html", verifyMail('Verify', `http://localhost:5000/api/admins/verifyAdmin/${token}`));
            }
        )
        sendData(res, admin);
    }
    catch (err) {
        checkFunction(res, err, err.message);
    }
}

exports.getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id).select('-password');
        sendData(res, admin);
    }
    catch (err) {
        checkFunction(res, err, err.message);
    }
}

exports.updateAdmin = async (req, res) => {
    try {
        // validation
        const validationErr = validationResult(req);
        checkFunction(res, validationErr?.errors?.length > 0, validationErr.array());

        const admin = await Admin.findByIdAndUpdate(req.body.id, req.body, { new: true, runValidators: true });
        sendData(res, admin);
    } catch (err) {
        checkFunction(res, err, err.message);
    }
}

exports.deleteAdmin = async (req, res) => {


}

exports.destroyAdmin = async (req, res) => {


}

exports.getAdmins = async (req, res) => {


}

exports.verifyAdmin = async (req, res) => {
    try {
        const user = await Admin.findByIdAndUpdate(
            req.decodedData.admin._id,
            { isActive: true },
            {
                new: true,
                runValidators: true,
            }
        ).select('-password');
        sendData(res, user);
    }
    catch (err) {
        checkFunction(res, err, err.message);
    }
}