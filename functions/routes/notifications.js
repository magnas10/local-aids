const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const Notification = require('../models/Notification');
const User = require('../models/User');
const { protect, admin, optionalAuth } = require('../middleware/auth');

// @route   POST /api/notifications
// @desc    Create a new notification (Admin only)
// @access  Private (Admin)
router.post('/', protect, admin, [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters'),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 1000 }).withMessage('Message cannot exceed 1000 characters'),
  body('type').optional().isIn(['info', 'warning', 'success', 'error', 'announcement']).withMessage('Invalid notification type'),
  body('priority').optional().isIn(['low', 'normal', 'high', 'urgent']).withMessage('Invalid priority level'),
  body('targetAudience').optional().isIn(['all', 'users', 'volunteers', 'admins']).withMessage('Invalid target audience'),
  body('expiresAt').optional().isISO8601().withMessage('Invalid expiration date')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const notification = new Notification({
      ...req.body,
      createdBy: req.user.id
    });

    await notification.save();
    await notification.populate('createdBy', 'name email');

    res.status(201).json({
      message: 'Notification created successfully',
      notification
    });
  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/notifications
// @desc    Get notifications for current user
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build where clause
    const where = {
      isActive: true,
      [Op.or]: [
        { expiresAt: null },
        { expiresAt: { [Op.gt]: new Date() } }
      ]
    };

    // If user is authenticated, filter by their role
    if (req.user) {
      const userRole = req.user.role;
      where[Op.and] = [
        {
          [Op.or]: [
            { targetAudience: 'all' },
            { targetAudience: userRole }
          ]
        }
      ];
    } else {
      // For unauthenticated users, only show 'all' audience notifications
      where.targetAudience = 'all';
    }

    const notifications = await Notification.findAll({
      where,
      include: [{
        model: User,
        as: 'creator',
        attributes: ['id', 'name', 'email']
      }],
      order: [['priority', 'DESC'], ['createdAt', 'DESC']],
      offset: skip,
      limit: limit
    });

    const total = await Notification.count({ where });

    res.json({
      notifications,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalNotifications: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/notifications/unread-count
// @desc    Get unread notification count for current user
// @access  Public
router.get('/unread-count', optionalAuth, async (req, res) => {
  try {
    if (!req.user) {
      return res.json({ count: 0 });
    }

    const where = {
      isActive: true,
      [Op.or]: [
        { expiresAt: null },
        { expiresAt: { [Op.gt]: new Date() } }
      ],
      [Op.or]: [
        { targetAudience: 'all' },
        { targetAudience: req.user.role }
      ]
    };

    const count = await Notification.count({ where });

    res.json({ count });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/notifications/:id/read
// @desc    Mark notification as read
// @access  Private
router.put('/:id/read', protect, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    await notification.markAsRead(req.user.id);

    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Mark notification read error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/notifications/admin
// @desc    Get all notifications for admin management
// @access  Private (Admin)
router.get('/admin', protect, admin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const notifications = await Notification.find()
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Notification.countDocuments();

    res.json({
      notifications,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalNotifications: total
      }
    });
  } catch (error) {
    console.error('Get admin notifications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/notifications/:id
// @desc    Update notification (Admin only)
// @access  Private (Admin)
router.put('/:id', protect, admin, [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty').isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters'),
  body('message').optional().trim().notEmpty().withMessage('Message cannot be empty').isLength({ max: 1000 }).withMessage('Message cannot exceed 1000 characters'),
  body('type').optional().isIn(['info', 'warning', 'success', 'error', 'announcement']).withMessage('Invalid notification type'),
  body('priority').optional().isIn(['low', 'normal', 'high', 'urgent']).withMessage('Invalid priority level'),
  body('targetAudience').optional().isIn(['all', 'users', 'volunteers', 'admins']).withMessage('Invalid target audience'),
  body('isActive').optional().isBoolean().withMessage('isActive must be boolean'),
  body('expiresAt').optional().isISO8601().withMessage('Invalid expiration date')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json({
      message: 'Notification updated successfully',
      notification
    });
  } catch (error) {
    console.error('Update notification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/notifications/:id
// @desc    Delete notification (Admin only)
// @access  Private (Admin)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/notifications/mark-all-read
// @desc    Mark all notifications as read for current user
// @access  Private
router.put('/mark-all-read', protect, async (req, res) => {
  try {
    const userRole = req.user.role;
    
    // Filter by target audience based on user role
    let audienceFilter = { $in: ['all'] };
    if (userRole === 'admin') {
      audienceFilter.$in.push('admins');
    } else if (userRole === 'volunteer') {
      audienceFilter.$in.push('volunteers');
    } else {
      audienceFilter.$in.push('users');
    }

    // Update all unread notifications for this user
    const result = await Notification.updateMany(
      { 
        targetAudience: audienceFilter,
        $or: [
          { readBy: { $ne: req.user.id } },
          { readBy: { $exists: false } }
        ],
        // Only update non-expired notifications
        $or: [
          { expiresAt: { $exists: false } },
          { expiresAt: { $gte: new Date() } }
        ]
      },
      { 
        $addToSet: { readBy: req.user.id } 
      }
    );

    res.json({ 
      message: 'All notifications marked as read',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error('Mark all notifications as read error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;