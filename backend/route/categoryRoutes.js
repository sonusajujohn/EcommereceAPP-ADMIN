const express = require('express');
const router = express.Router();
const {
  addCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  addSecondaryCategory,
  deleteSecondaryCategory,
} = require('../controllers/categoryController');
const { verifySuperAdmin, verifyAdmin } = require('../middleware/authMiddleware');

// Super Admin Routes
router.post('/add', verifySuperAdmin, addCategory);
router.put('/:id', verifySuperAdmin, updateCategory);
router.delete('/:id', verifySuperAdmin, deleteCategory);
router.get('/all', verifySuperAdmin, getAllCategories);

// Admin Routes
router.post('/secondary/:id', verifyAdmin, addSecondaryCategory);
router.delete('/secondary/:id', verifyAdmin, deleteSecondaryCategory);

module.exports = router;
