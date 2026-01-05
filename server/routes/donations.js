const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Donation = require('../models/Donation');
const { protect, admin, optionalAuth } = require('../middleware/auth');

// @route   GET /api/donations
// @desc    Get all donations (admin only)
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { status, type } = req.query;

    const query = {};
    if (status) query.status = status;
    if (type) query.type = type;

    const donations = await Donation.find(query)
      .populate('donor', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Donation.countDocuments(query);
    const totalAmount = await Donation.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.json({
      donations,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalDonations: total
      },
      stats: {
        totalAmount: totalAmount[0]?.total || 0
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
    const donations = await Donation.find({ donor: req.user.id })
      .sort({ createdAt: -1 });

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
    const totalDonations = await Donation.countDocuments({ status: 'completed' });
    const totalAmount = await Donation.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const monthlyDonations = await Donation.aggregate([
      { $match: { status: 'completed', createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 12)) } } },
      {
        $group: {
          _id: { $month: '$createdAt' },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      totalDonations,
      totalAmount: totalAmount[0]?.total || 0,
      monthlyDonations
    });
  } catch (error) {
    console.error('Get donation stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/donations
// @desc    Create a new donation
// @access  Public (optional auth for registered users)
router.post('/', optionalAuth, [
  body('amount').isFloat({ min: 1 }).withMessage('Amount must be at least $1'),
  body('donorInfo.name').notEmpty().withMessage('Name is required'),
  body('donorInfo.email').isEmail().withMessage('Valid email is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const donationData = {
      ...req.body,
      donor: req.user ? req.user.id : null,
      status: 'pending' // Will be updated after payment processing
    };

    const donation = new Donation(donationData);
    await donation.save();

    // TODO: Integrate with payment processor (Stripe, PayPal, etc.)
    // For now, we'll simulate a successful payment
    donation.status = 'completed';
    donation.paymentId = `PAY-${Date.now()}`;
    await donation.save();

    res.status(201).json({
      message: 'Thank you for your donation!',
      donation: {
        id: donation._id,
        amount: donation.amount,
        receiptNumber: donation.receiptNumber,
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
    const donation = await Donation.findById(req.params.id)
      .populate('donor', 'name email');

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Only allow donor or admin to view
    if (donation.donor && donation.donor._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json({ donation });
  } catch (error) {
    console.error('Get donation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
