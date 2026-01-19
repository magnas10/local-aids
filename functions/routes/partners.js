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

    const where = { isActive: true };
    if (category) where.category = category;

    const partners = await Partner.findAll({
      where,
      order: [['name', 'ASC']]
    });

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
    const partner = await Partner.findByPk(req.params.id);

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
  body('name').trim().notEmpty().withMessage('Partner name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('logoUrl').trim().notEmpty().withMessage('Logo URL is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, logoUrl, websiteUrl, category } = req.body;

    const partner = await Partner.create({
      name,
      description,
      logoUrl,
      websiteUrl,
      category: category || 'corporate'
    });

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
    const partner = await Partner.findByPk(req.params.id);

    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    const { name, description, logoUrl, websiteUrl, category, isActive } = req.body;

    await partner.update({
      name: name || partner.name,
      description: description || partner.description,
      logoUrl: logoUrl || partner.logoUrl,
      websiteUrl: websiteUrl !== undefined ? websiteUrl : partner.websiteUrl,
      category: category || partner.category,
      isActive: isActive !== undefined ? isActive : partner.isActive
    });

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
    const partner = await Partner.findByPk(req.params.id);

    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    await partner.destroy();

    res.json({ message: 'Partner deleted successfully' });
  } catch (error) {
    console.error('Delete partner error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
