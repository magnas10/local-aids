const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Message = require('../models/Message');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// @route   GET /api/messages
// @desc    Get user's messages (inbox)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const folder = req.query.folder || 'inbox';

    let query;
    if (folder === 'inbox') {
      query = { 
        recipient: req.user.id,
        deletedBy: { $ne: req.user.id }
      };
    } else if (folder === 'sent') {
      query = { 
        sender: req.user.id,
        deletedBy: { $ne: req.user.id }
      };
    }

    const messages = await Message.find(query)
      .populate('sender', 'name email avatar')
      .populate('recipient', 'name email avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Message.countDocuments(query);
    const unreadCount = await Message.countDocuments({
      recipient: req.user.id,
      isRead: false,
      deletedBy: { $ne: req.user.id }
    });

    res.json({
      messages,
      unreadCount,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalMessages: total
      }
    });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/messages/unread-count
// @desc    Get unread message count
// @access  Private
router.get('/unread-count', protect, async (req, res) => {
  try {
    const count = await Message.countDocuments({
      recipient: req.user.id,
      isRead: false,
      deletedBy: { $ne: req.user.id }
    });

    res.json({ unreadCount: count });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/messages/:id
// @desc    Get single message
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate('sender', 'name email avatar')
      .populate('recipient', 'name email avatar');

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Check if user is sender or recipient
    if (message.sender._id.toString() !== req.user.id && 
        message.recipient._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Mark as read if recipient is viewing
    if (message.recipient._id.toString() === req.user.id && !message.isRead) {
      await message.markAsRead();
    }

    res.json({ message });
  } catch (error) {
    console.error('Get message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/messages
// @desc    Send a new message
// @access  Private
router.post('/', protect, [
  body('recipientId').notEmpty().withMessage('Recipient is required'),
  body('content').trim().notEmpty().withMessage('Message content is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { recipientId, subject, content, parentMessage } = req.body;

    // Verify recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    // Can't message yourself
    if (recipientId === req.user.id) {
      return res.status(400).json({ message: 'Cannot send message to yourself' });
    }

    const message = new Message({
      sender: req.user.id,
      recipient: recipientId,
      subject,
      content,
      parentMessage
    });

    await message.save();
    await message.populate('sender', 'name email avatar');
    await message.populate('recipient', 'name email avatar');

    res.status(201).json({
      message: 'Message sent successfully',
      data: message
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/messages/:id/read
// @desc    Mark message as read
// @access  Private
router.put('/:id/read', protect, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (message.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await message.markAsRead();

    res.json({ message: 'Message marked as read' });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/messages/:id
// @desc    Delete a message
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Check if user is sender or recipient
    if (message.sender.toString() !== req.user.id && 
        message.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Soft delete - add user to deletedBy array
    if (!message.deletedBy.includes(req.user.id)) {
      message.deletedBy.push(req.user.id);
      await message.save();
    }

    // If both sender and recipient deleted, remove permanently
    if (message.deletedBy.length >= 2) {
      await Message.findByIdAndDelete(req.params.id);
    }

    res.json({ message: 'Message deleted' });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
