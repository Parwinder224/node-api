const mongoose = require('../DB/productDb');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'this filed is required']

    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    }

},
    {
        timestamps: true
    })
// productSchema.method("toJSON", function() {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     delete _id;
//     return object;
//   });

productSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});
const Product = mongoose.model('Product', productSchema)

module.exports = Product;