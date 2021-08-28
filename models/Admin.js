const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ['created', 'updated', 'deleted'],
        default: 'created',
    },
    deletedAt: {
        type: Date,
    }
}, { collection: 'Admins', timestamps: true });

module.exports = mongoose.model('Admin', schema);