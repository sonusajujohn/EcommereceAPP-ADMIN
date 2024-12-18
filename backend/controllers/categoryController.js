const Category = require('../models/categoryModel');

// Super Admin Operations

// Add a new top-level category
const addCategory = async (req, res) => {
  try {
    const { topLevel, secondaryLevels } = req.body;
    const newCategory = new Category({ topLevel, secondaryLevels });
    await newCategory.save();
    res.status(201).json({ message: 'Category added successfully', category: newCategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit a category
const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin Operations

// Add a secondary-level category
const addSecondaryCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    const { secondaryLevel } = req.body;
    if (category.secondaryLevels.includes(secondaryLevel)) {
      return res.status(400).json({ message: 'Secondary category already exists' });
    }

    category.secondaryLevels.push(secondaryLevel);
    await category.save();
    res.status(200).json({ message: 'Secondary category added successfully', category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a secondary-level category
const deleteSecondaryCategory = async (req, res) => {
  try {
    const { secondaryLevel } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    category.secondaryLevels = category.secondaryLevels.filter(level => level !== secondaryLevel);
    await category.save();
    res.status(200).json({ message: 'Secondary category deleted successfully', category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  addSecondaryCategory,
  deleteSecondaryCategory,
};
