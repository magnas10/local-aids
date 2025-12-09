const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Partner = require('../models/Partner');
const { protect, admin } = require('../middleware/auth');

// @route   GET /api/partners
// @desc    Get all active partners
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;

    const query = { isActive: true };
    if (category) query.category = category;
    if (featured === 'true') query.isFeatured = true;

    const partners = await Partner.find(query)
      .sort({ isFeatured: -1, name: 1 });

    res.json({ partners });
  } catch (error) {
    console.error('Get partners error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/partners/:id
// @desc    Get single partner
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);

    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    res.json({ partner });
  } catch (error) {
    console.error('Get partner error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/partners
// @desc    Add a new partner
// @access  Private/Admin
router.post('/', protect, admin, [
  body('name').trim().notEmpty().withMessage('Partner name is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const partner = new Partner(req.body);
    await partner.save();

    res.status(201).json({
      message: 'Partner added successfully',
      partner
    });
  } catch (error) {
    console.error('Create partner error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/partners/:id
// @desc    Update a partner
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const partner = await Partner.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    res.json({
      message: 'Partner updated successfully',
      partner
    });
  } catch (error) {
    console.error('Update partner error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/partners/:id
// @desc    Delete a partner
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);

    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    res.json({ message: 'Partner deleted successfully' });
  } catch (error) {
    console.error('Delete partner error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
