const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const sequelize = require('../config/database');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const ConversationParticipant = require('../models/ConversationParticipant');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// @route   GET /api/messages/conversations
// @desc    Get user's conversations
// @access  Private
router.get('/conversations', protect, async (req, res) => {
  try {
    // Find all conversations where user is a participant
    const participations = await ConversationParticipant.findAll({
      where: {
        userId: req.user.id,
        isActive: true
      },
      include: [{
        model: Conversation,
        as: 'conversation',
        where: { isActive: true },
        include: [
          {
            model: User,
            as: 'creator',
            attributes: ['id', 'name', 'email', 'profileImage']
          },
          {
            model: ConversationParticipant,
            as: 'participants',
            where: { isActive: true },
            include: [{
              model: User,
              as: 'user',
              attributes: ['id', 'name', 'email', 'profileImage']
            }]
          },
          {
            model: Message,
            as: 'messages',
            limit: 1,
            order: [['createdAt', 'DESC']],
            separate: true,
            include: [{
              model: User,
              as: 'sender',
              attributes: ['id', 'name']
            }]
          }
        ]
      }],
      order: [[{ model: Conversation, as: 'conversation' }, 'lastMessageAt', 'DESC NULLS LAST']]
    });

    // Calculate unread counts for each conversation
    const conversationsWithUnread = await Promise.all(participations.map(async (participation) => {
      const conversation = participation.conversation;
      
      // Count unread messages
      const unreadCount = await Message.count({
        where: {
          conversationId: conversation.id,
          createdAt: {
            [Op.gt]: participation.lastReadAt || new Date(0)
          },
          senderId: {
            [Op.ne]: req.user.id
          }
        }
      });

      return {
        id: conversation.id,
        type: conversation.type,
        name: conversation.type === 'direct' 
          ? conversation.participants.find(p => p.userId !== req.user.id)?.user.name || 'Unknown'
          : conversation.name,
        description: conversation.description,
        avatar: conversation.type === 'direct'
          ? conversation.participants.find(p => p.userId !== req.user.id)?.user.profileImage
          : conversation.avatar,
        participants: conversation.participants.map(p => ({
          id: p.userId,
          name: p.user.name,
          email: p.user.email,
          profileImage: p.user.profileImage,
          role: p.role
        })),
        lastMessage: conversation.messages[0] || null,
        lastMessageAt: conversation.lastMessageAt,
        unreadCount,
        createdAt: conversation.createdAt
      };
    }));

    res.json({ conversations: conversationsWithUnread });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// @route   GET /api/messages/:conversationId
// @desc    Get messages in a conversation
// @access  Private
router.get('/:conversationId', protect, async (req, res) => {
  try {
    const { conversationId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;

    // Verify user is participant
    const participant = await ConversationParticipant.findOne({
      where: {
        conversationId,
        userId: req.user.id,
        isActive: true
      }
    });

    if (!participant) {
      return res.status(403).json({ message: 'Not authorized to view this conversation' });
    }

    // Get messages
    const messages = await Message.findAll({
      where: { conversationId },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'name', 'email', 'profileImage']
        },
        {
          model: Message,
          as: 'replyTo',
          attributes: ['id', 'content'],
          include: [{
            model: User,
            as: 'sender',
            attributes: ['id', 'name']
          }]
        }
      ],
      order: [['createdAt', 'ASC']],
      limit,
      offset
    });

    const total = await Message.count({ where: { conversationId } });

    // Update last read time
    await participant.update({ lastReadAt: new Date() });

    res.json({
      messages,
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

// @route   POST /api/messages/conversations
// @desc    Create a new conversation (direct or group)
// @access  Private
router.post('/conversations', protect, [
  body('type').isIn(['direct', 'group']).withMessage('Type must be direct or group'),
  body('participantIds').isArray({ min: 1 }).withMessage('At least one participant required'),
  body('name').optional().trim().notEmpty().withMessage('Group name required for group conversations')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { type, participantIds, name, description } = req.body;

    // Validate participants exist
    const participants = await User.findAll({
      where: { id: participantIds }
    });

    if (participants.length !== participantIds.length) {
      return res.status(400).json({ message: 'One or more participants not found' });
    }

    // For direct conversations, check if conversation already exists
    if (type === 'direct') {
      if (participantIds.length !== 1) {
        return res.status(400).json({ message: 'Direct conversations must have exactly 1 other participant' });
      }

      const otherUserId = participantIds[0];
      
      // Find all direct conversations involving current user
      const userParticipations = await ConversationParticipant.findAll({
        where: {
          userId: req.user.id,
          isActive: true
        },
        include: [{
          model: Conversation,
          as: 'conversation',
          where: { type: 'direct', isActive: true },
          include: [{
            model: ConversationParticipant,
            as: 'participants',
            where: { isActive: true }
          }]
        }]
      });

      // Check if any of these conversations is with the target user
      for (const participation of userParticipations) {
        const conv = participation.conversation;
        const participantIds = conv.participants.map(p => p.userId);
        
        // Direct conversation has exactly 2 participants: current user and target user
        if (participantIds.length === 2 && 
            participantIds.includes(req.user.id) && 
            participantIds.includes(otherUserId)) {
          
          // Return existing conversation with full details
          const existingConv = await Conversation.findByPk(conv.id, {
            include: [{
              model: ConversationParticipant,
              as: 'participants',
              include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'email', 'profileImage']
              }]
            }]
          });
          
          return res.json({ conversation: existingConv, existed: true });
        }
      }
    }

    // Create conversation
    console.log('Creating conversation with type:', type, 'participants:', participantIds);
    const conversation = await Conversation.create({
      type,
      name: type === 'group' ? name : null,
      description,
      createdBy: req.user.id
    });
    console.log('Conversation created:', conversation.id);

    // Add creator as participant
    await ConversationParticipant.create({
      conversationId: conversation.id,
      userId: req.user.id,
      role: 'admin'
    });
    console.log('Creator added as participant');

    // Add other participants
    await Promise.all(participantIds.map(userId =>
      ConversationParticipant.create({
        conversationId: conversation.id,
        userId,
        role: 'member'
      })
    ));
    console.log('Other participants added');

    // Fetch created conversation with participants
    const createdConversation = await Conversation.findByPk(conversation.id, {
      include: [{
        model: ConversationParticipant,
        as: 'participants',
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'profileImage']
        }]
      }]
    });

    res.status(201).json({
      message: 'Conversation created successfully',
      conversation: createdConversation
    });
  } catch (error) {
    console.error('Create conversation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/messages
// @desc    Send a message in a conversation
// @access  Private
router.post('/', protect, [
  body('conversationId').notEmpty().withMessage('Conversation ID required'),
  body('content').trim().notEmpty().withMessage('Message content required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { conversationId, content, replyToId } = req.body;

    // Verify user is participant
    const participant = await ConversationParticipant.findOne({
      where: {
        conversationId,
        userId: req.user.id,
        isActive: true
      }
    });

    if (!participant) {
      return res.status(403).json({ message: 'Not authorized to send messages in this conversation' });
    }

    // Create message
    const message = await Message.create({
      conversationId,
      senderId: req.user.id,
      content,
      replyToId: replyToId || null,
      type: 'text'
    });

    // Update conversation last message time
    await Conversation.update(
      { lastMessageAt: new Date() },
      { where: { id: conversationId } }
    );

    // Fetch created message with sender info
    const createdMessage = await Message.findByPk(message.id, {
      include: [{
        model: User,
        as: 'sender',
        attributes: ['id', 'name', 'email', 'profileImage']
      }]
    });

    res.status(201).json({
      message: 'Message sent successfully',
      data: createdMessage
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/messages/unread-count
// @desc    Get total unread message count
// @access  Private
router.get('/conversations/unread/count', protect, async (req, res) => {
  try {
    // Get all user's active conversation participations
    const participations = await ConversationParticipant.findAll({
      where: {
        userId: req.user.id,
        isActive: true
      },
      attributes: ['conversationId', 'lastReadAt']
    });

    // Count unread messages across all conversations
    let totalUnread = 0;
    for (const participation of participations) {
      const unreadCount = await Message.count({
        where: {
          conversationId: participation.conversationId,
          createdAt: {
            [Op.gt]: participation.lastReadAt || new Date(0)
          },
          senderId: {
            [Op.ne]: req.user.id
          }
        }
      });
      totalUnread += unreadCount;
    }

    res.json({ unreadCount: totalUnread });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/messages/users/search
// @desc    Search users to start a conversation
// @access  Private
router.get('/users/search', protect, async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || query.length < 2) {
      return res.json({ users: [] });
    }

    const users = await User.findAll({
      where: {
        id: {
          [Op.ne]: req.user.id // Exclude current user
        },
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${query}%`
            }
          },
          {
            email: {
              [Op.iLike]: `%${query}%`
            }
          }
        ]
      },
      attributes: ['id', 'name', 'email', 'profileImage'],
      limit: 10
    });

    res.json({ users });
  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;