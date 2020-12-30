const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

router.post(
  '/getAll',
  // authController.verifyToken,
  categoryController.getAllCategories,

  (req, res) => {
    res.status(200).json(res.locals.categories);
  }
);

module.exports = router;
