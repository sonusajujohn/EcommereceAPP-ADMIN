const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  image: {
    type: String, // Store the image URL as a string
    required: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  totalQuantity: {
    type: Number,
    required: true,
  },
  sizeQuantities: {
    '6': { type: Number, default: 0 },
    '7': { type: Number, default: 0 },
    '8': { type: Number, default: 0 },
    '9': { type: Number, default: 0 },
    '10': { type: Number, default: 0 },
    '11': { type: Number, default: 0 },
  },
  color: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  topCategory: {
    type: String,
    enum: ['men', 'women'],
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
    enum: [
      'formals', 'casuals', 'boots', 'sandals/flipflops', 'sportswear', 'ethnic footwears', // for men
      'heels', 'flats', 'casualshoes', 'sportsshoes', 'ethnic footwear', 'boots', // for women
    ],
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const productData = mongoose.model('product', productSchema);

module.exports = productData;
