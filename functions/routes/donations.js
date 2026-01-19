const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const sequelize = require('../config/database');
const Donation = require('../models/Donation');
const User = require('../models/User');
const { protect, admin, optionalAuth } = require('../middleware/auth');

// @route   GET /api/donations
// @desc    Get all donations (admin only)
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const { status, type } = req.query;

    const where = {};
    if (status) where.status = status;
    if (type) where.type = type;

    const { count, rows: donations } = await Donation.findAndCountAll({
      where,
      include: [{
        model: User,
        as: 'donor',
        attributes: ['id', 'name', 'email'],
        required: false
      }],
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });

    // Get total amount of completed donations
    const totalAmountResult = await Donation.sum('amount', {
      where: { status: 'completed' }
    });

    res.json({
      donations,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalDonations: count
      },
      stats: {
        totalAmount: totalAmountResult || 0
      }
    });
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/donations/my
// @desc    Get current user's donations
// @access  Private
router.get('/my', protect, async (req, res) => {
  try {
    const donations = await Donation.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    res.json({ donations });
  } catch (error) {
    console.error('Get my donations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/donations/stats
// @desc    Get donation statistics
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const totalDonations = await Donation.count({ 
      where: { status: 'completed' } 
    });
    
    const totalAmount = await Donation.sum('amount', {
      where: { status: 'completed' }
    });

    res.json({
      totalDonations,
      totalAmount: totalAmount || 0
    });
  } catch (error) {
    console.error('Get donation stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/donations/recent
// @desc    Get recent donations
// @access  Public
router.get('/recent', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    
    const donations = await Donation.findAll({
      where: { 
        status: 'completed',
        isAnonymous: false
      },
      attributes: ['id', 'donorName', 'amount', 'message', 'createdAt'],
      order: [['createdAt', 'DESC']],
      limit
    });

    res.json({ donations });
  } catch (error) {
    console.error('Get recent donations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/donations
// @desc    Create a new donation
// @access  Public (optional auth for registered users)
router.post('/', optionalAuth, [
  body('amount').isFloat({ min: 1 }).withMessage('Amount must be at least $1'),
  body('donorName').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('type').isIn(['one-time', 'monthly']).withMessage('Invalid donation type')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, donorName, email, type, message, isAnonymous } = req.body;

    const donation = await Donation.create({
      amount,
      donorName,
      email,
      type,
      message,
      isAnonymous: isAnonymous || false,
      userId: req.user ? req.user.id : null,
      status: 'completed', // Simulating successful payment
      transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    });

    res.status(201).json({
      message: 'Thank you for your donation!',
      donation: {
        id: donation.id,
        amount: donation.amount,
        transactionId: donation.transactionId,
        status: donation.status
      }
    });
  } catch (error) {
    console.error('Create donation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/donations/:id
// @desc    Get donation by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const donation = await Donation.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'donor',
        attributes: ['id', 'name', 'email'],
        required: false
      }]
    });

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Only allow donor or admin to view
    if (donation.userId && donation.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json({ donation });
  } catch (error) {
    console.error('Get donation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
