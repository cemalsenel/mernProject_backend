const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    categoryName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        default: 'created',
    },
    deletedAt: {
        type: Date,
    },

    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
}, { timestamps: true })

module.exports = mongoose.model('Category', schema);