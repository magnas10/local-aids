const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const HelpRequest = require('../models/HelpRequest');
const { protect, admin, optionalAuth } = require('../middleware/auth');

// @route   POST /api/help-requests
// @desc    Create a new help request
// @access  Public
router.post('/', [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  body('suburb').trim().notEmpty().withMessage('Suburb is required'),
  body('state').isIn(['VIC', 'NSW', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']).withMessage('Valid state is required'),
  body('postcode').trim().notEmpty().withMessage('Postcode is required'),
  body('helpType').isIn(['transport', 'shopping', 'companionship', 'household', 'meals', 'medical', 'tech', 'other']).withMessage('Valid help type is required'),
  body('urgency').isIn(['low', 'normal', 'high', 'urgent']).withMessage('Valid urgency level is required'),
  body('description').trim().notEmpty().isLength({ max: 1000 }).withMessage('Description is required and must not exceed 1000 characters'),
  body('agreeTerms').isBoolean().equals('true').withMessage('Must agree to terms and conditions'),
  body('agreePrivacy').isBoolean().equals('true').withMessage('Must agree to privacy policy')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const helpRequest = new HelpRequest(req.body);
    await helpRequest.save();

    res.status(201).json({
      message: 'Help request submitted successfully',
      helpRequest: {
        id: helpRequest._id,
        helpType: helpRequest.helpType,
        urgency: helpRequest.urgency,
        location: helpRequest.formattedLocation,
        status: helpRequest.status
      }
    });
  } catch (error) {
    console.error('Create help request error:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => ({
        field: e.path,
        message: e.message
      }));
      return res.status(400).json({
        message: 'Validation failed',
        errors
      });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/help-requests
// @desc    Get all help requests (filtered)
// @access  Public (for events), Admin (for all details)
router.get('/', optionalAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { urgency, helpType, status, showAsEvent } = req.query;

    // Build query
    const query = {};
    if (urgency) query.urgency = urgency;
    if (helpType) query.helpType = helpType;
    if (status) query.status = status;
    if (showAsEvent === 'true') query.showAsEvent = true;

    // For non-admin users, only show basic info and exclude personal details
    const isAdmin = req.user && req.user.role === 'admin';
    
    let selectFields = '';
    if (!isAdmin) {
      selectFields = 'helpType urgency description preferredDate preferredTime duration suburb state priority category status createdAt';
    }

    const helpRequests = await HelpRequest.find(query)
      .select(selectFields)
      .sort({ urgency: -1, createdAt: -1 }) // High urgency first, then newest first
      .skip(skip)
      .limit(limit);

    const total = await HelpRequest.countDocuments(query);

    res.json({
      helpRequests,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalRequests: total
      }
    });
  } catch (error) {
    console.error('Get help requests error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/help-requests/opportunities
// @desc    Get help requests for opportunities section (high priority only)
// @access  Public
router.get('/opportunities', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    const helpRequests = await HelpRequest.find({
      status: 'pending',
      showInOpportunities: true,
      $or: [
        { urgency: 'high' },
        { urgency: 'urgent' }
      ]
    })
    .select('helpType urgency description preferredDate preferredTime duration suburb state priority category status createdAt fullName')
    .sort({ urgency: -1, createdAt: -1 })
    .limit(limit);

    // Transform to opportunities format
    const opportunities = helpRequests.map((request, index) => ({
      id: `help-${request._id}`,
      title: `${request.category} ${request.priority === 'Urgent' ? '- URGENT' : '- High Priority'}`,
      description: request.description,
      distance: Math.random() * 5 + 0.5, // Random distance for now
      duration: request.duration || '2 hours',
      priority: request.priority,
      category: request.category,
      image: getImageForHelpType(request.helpType),
      postedTime: getTimeAgo(request.createdAt),
      requester: request.fullName ? request.fullName.split(' ')[0] + ' ' + request.fullName.split(' ')[1]?.charAt(0) + '.' : 'Anonymous',
      requesterImage: `https://images.unsplash.com/photo-${1544005313 + index}94-${request._id.toString().slice(-6)}/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop`,
      location: `${request.suburb}, ${request.state}`,
      address: `${request.suburb}, ${request.state}`,
      coordinates: { lat: -37.8008 + (Math.random() - 0.5) * 0.1, lng: 144.9671 + (Math.random() - 0.5) * 0.1 },
      date: request.preferredDate || 'Flexible',
      verified: true,
      type: 'help-request',
      originalRequest: request._id
    }));

    res.json(opportunities);
  } catch (error) {
    console.error('Get help opportunities error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/help-requests/:id
// @desc    Get single help request
// @access  Admin only (full details) or Public (limited details)
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const isAdmin = req.user && req.user.role === 'admin';
    
    let selectFields = '';
    if (!isAdmin) {
      selectFields = 'helpType urgency description preferredDate preferredTime duration suburb state priority category status createdAt';
    }

    const helpRequest = await HelpRequest.findById(req.params.id)
      .select(selectFields)
      .populate('assignedVolunteer', 'name email');

    if (!helpRequest) {
      return res.status(404).json({ message: 'Help request not found' });
    }

    res.json(helpRequest);
  } catch (error) {
    console.error('Get help request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/help-requests/:id/status
// @desc    Update help request status
// @access  Admin only
router.put('/:id/status', protect, admin, [
  body('status').isIn(['pending', 'matched', 'in-progress', 'completed', 'cancelled']).withMessage('Valid status is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const helpRequest = await HelpRequest.findByIdAndUpdate(
      req.params.id,
      { 
        status: req.body.status,
        assignedVolunteer: req.body.volunteerId || null
      },
      { new: true }
    );

    if (!helpRequest) {
      return res.status(404).json({ message: 'Help request not found' });
    }

    res.json({
      message: 'Help request status updated successfully',
      helpRequest
    });
  } catch (error) {
    console.error('Update help request status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/help-requests/:id
// @desc    Update a help request (by requester with email verification)
// @access  Public (with email verification)
router.put('/:id', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required for verification'),
  body('fullName').optional().trim().notEmpty().withMessage('Full name cannot be empty'),
  body('phone').optional().trim().notEmpty().withMessage('Phone number cannot be empty'),
  body('address').optional().trim().notEmpty().withMessage('Address cannot be empty'),
  body('suburb').optional().trim().notEmpty().withMessage('Suburb cannot be empty'),
  body('state').optional().isIn(['VIC', 'NSW', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']).withMessage('Valid state is required'),
  body('postcode').optional().trim().notEmpty().withMessage('Postcode cannot be empty'),
  body('helpType').optional().isIn(['transport', 'shopping', 'companionship', 'household', 'meals', 'medical', 'tech', 'other']).withMessage('Valid help type is required'),
  body('urgency').optional().isIn(['low', 'normal', 'high', 'urgent']).withMessage('Valid urgency level is required'),
  body('description').optional().trim().notEmpty().isLength({ max: 1000 }).withMessage('Description must not exceed 1000 characters'),
  body('preferredDate').optional(),
  body('preferredTime').optional()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const helpRequest = await HelpRequest.findById(req.params.id);
    
    if (!helpRequest) {
      return res.status(404).json({ message: 'Help request not found' });
    }

    // Check if the email matches the requester's email
    if (helpRequest.email !== req.body.email) {
      return res.status(403).json({ 
        message: 'Access denied. You can only edit your own help requests.' 
      });
    }

    // Only allow editing if the request hasn't been matched or is still pending
    if (helpRequest.status !== 'pending') {
      return res.status(400).json({ 
        message: 'Cannot edit help request that has already been matched or completed.' 
      });
    }

    // Remove email from update data (we don't want to change the email)
    const { email, ...updateData } = req.body;
    
    // Update the help request
    const updatedRequest = await HelpRequest.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Help request updated successfully',
      helpRequest: updatedRequest
    });
  } catch (error) {
    console.error('Update help request error:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => ({
        field: e.path,
        message: e.message
      }));
      return res.status(400).json({
        message: 'Validation failed',
        errors
      });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/help-requests/:id
// @desc    Delete a help request (by requester with email verification)
// @access  Public (with email verification)
router.delete('/:id', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required for verification')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Valid email is required for verification',
        errors: errors.array()
      });
    }

    const helpRequest = await HelpRequest.findById(req.params.id);
    
    if (!helpRequest) {
      return res.status(404).json({ message: 'Help request not found' });
    }

    // Check if the email matches the requester's email
    if (helpRequest.email !== req.body.email) {
      return res.status(403).json({ 
        message: 'Access denied. You can only delete your own help requests.' 
      });
    }

    // Only allow deletion if the request hasn't been matched or is still pending
    if (helpRequest.status !== 'pending') {
      return res.status(400).json({ 
        message: 'Cannot delete help request that has already been matched or completed.' 
      });
    }

    await HelpRequest.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Help request deleted successfully'
    });
  } catch (error) {
    console.error('Delete help request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function to get image based on help type
function getImageForHelpType(helpType) {
  const images = {
    'transport': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop',
    'shopping': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=250&fit=crop',
    'companionship': 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&h=250&fit=crop',
    'household': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
    'meals': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop',
    'medical': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
    'tech': 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop',
    'other': 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=250&fit=crop'
  };
  return images[helpType] || images['other'];
}

// Helper function to get time ago
function getTimeAgo(date) {
  const now = new Date();
  const diff = now - new Date(date);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  return 'Just now';
}

module.exports = router;