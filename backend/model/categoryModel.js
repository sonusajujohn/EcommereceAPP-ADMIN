const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  topLevel: {
    type: String,
    enum: ['men', 'women'],
    required: true,
    unique: true, // Ensures no duplicate top-level categories
  },
  secondaryLevels: [{
    type: String,
    enum: [
      'formals', 'casuals', 'boots', 'sandals/flipflops', 'sportswear', 'ethnic footwears', // for men
      'heels', 'flats', 'casualshoes', 'sportsshoes', 'ethnic footwear', 'boots', // for women
    ],
  }],
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;
