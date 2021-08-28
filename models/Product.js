const mongoose = require('mongoose');
const { Schema } = mongoose;
// const Base = require('./BaseEntity');

const schema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    ImagePath: {
        type: String,
        default: 'https://via.placeholder.com/250x250.png?text=No+Image',
    },
    quantity: {
        type: Number,
        default: 0,
    },
    unitPrice: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        default: 'created',
    },
    deletedAt: {
        type: Date,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
});

// #region extra

schema.methods.totalPrice = function () {
    return this.unitPrice * this.quantity;
}

schema.methods.findSimilarNames = function (cb) {
    return mongoose.model('Product').find({ productName: this.productName }, cb);
};

schema.statics.findByName = function (name, cb) {
    return this.find({ productName: new RegExp(name, 'i') }, cb);
}

schema.query.byName = function (name) {
    return this.where({ productName: new RegExp(name, 'i') });
}


schema.virtual('nameQuantity').get(function () {
    return this.productName;
}).set(function (value) {
    this.productName = value.substr(0, value.indexOf(' '));
    this.status = value.substr(value.indexOf(' ') + 1);
})

// Product = Base.discriminator('Product', schema);



// console.log(product.totalPrice());
// console.log(product.findSimilarNames((err, products) => {
//     console.log(products);
// }));

// Product.findByName('msi', (err, products) => {
//     console.log(products);
// })

// Product.find().byName('msi').exec((err, products) => {
//     console.log(products);
// });

// #endregion


module.exports = mongoose.model('Product', schema);
