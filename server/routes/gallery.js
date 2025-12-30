const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');
const GalleryItem = require('../models/GalleryItem');
const User = require('../models/User');
const { protect, admin, optionalAuth } = require('../middleware/auth');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/gallery/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'gallery-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(new Error('Only image files are allowed!'));
};

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
  fileFilter
});

// @route   GET /api/gallery
// @desc    Get all gallery items (approved only for public, all for admin)
// @access  Public/Admin
router.get('/', optionalAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;
    const { category, status } = req.query;

    const where = {};
    
    // Only show approved images to non-admin users
    if (!req.user || req.user.role !== 'admin') {
      where.status = 'approved';
    } else if (status) {
      // Admin can filter by status
      where.status = status;
    }
    
    if (category && category !== 'all') {
      where.category = category;
    }

    const items = await GalleryItem.findAll({
      where,
      include: [
        {
          model: User,
          as: 'uploader',
          attributes: ['id', 'name', 'email']
        },
        {
          model: User,
          as: 'approver',
          attributes: ['id', 'name'],
          required: false
        }
      ],
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });

    const total = await GalleryItem.count({ where });

    res.json({
      data: items,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Get gallery error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/gallery/categories
// @desc    Get gallery categories with counts
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await GalleryItem.aggregate([
      { $match: { isPublic: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/gallery/:id
// @desc    Get single gallery item
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const item = await GalleryItem.findById(req.params.id)
      .populate('uploadedBy', 'name')
      .populate('event', 'title date');

    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    res.json({ item });
  } catch (error) {
    console.error('Get gallery item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/gallery
// @desc    Upload a new gallery item
// @access  Private (Any authenticated user)
router.post('/', protect, upload.single('image'), [
  body('title').trim().notEmpty().withMessage('Title is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const { title, description, category, tags } = req.body;

    const item = await GalleryItem.create({
      title,
      description,
      imageUrl: `/uploads/gallery/${req.file.filename}`,
      category: category || 'general',
      tags: tags ? (typeof tags === 'string' ? JSON.parse(tags) : tags) : [],
      uploadedBy: req.user.id,
      status: 'pending', // All uploads start as pending
      featured: false
    });

    const itemWithUser = await GalleryItem.findByPk(item.id, {
      include: [{
        model: User,
        as: 'uploader',
        attributes: ['id', 'name']
      }]
    });

    res.status(201).json({
      message: 'Image uploaded successfully and pending approval',
      item: itemWithUser
    });
  } catch (error) {
    console.error('Upload gallery item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/gallery/:id
// @desc    Update gallery item
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { title, description, category, tags, featured } = req.body;

    const item = await GalleryItem.findByPk(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    // Update fields
    if (title) item.title = title;
    if (description !== undefined) item.description = description;
    if (category) item.category = category;
    if (tags) item.tags = Array.isArray(tags) ? tags : JSON.parse(tags);
    if (featured !== undefined) item.featured = featured;

    await item.save();

    const updatedItem = await GalleryItem.findByPk(item.id, {
      include: [{
        model: User,
        as: 'uploader',
        attributes: ['id', 'name']
      }]
    });

    res.json({
      message: 'Gallery item updated successfully',
      item: updatedItem
    });
  } catch (error) {
    console.error('Update gallery item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/gallery/:id/approve
// @desc    Approve a gallery item
// @access  Private/Admin
router.put('/:id/approve', protect, admin, async (req, res) => {
  try {
    const item = await GalleryItem.findByPk(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    item.status = 'approved';
    item.approvedBy = req.user.id;
    item.approvedAt = new Date();
    await item.save();

    const updatedItem = await GalleryItem.findByPk(item.id, {
      include: [
        {
          model: User,
          as: 'uploader',
          attributes: ['id', 'name', 'email']
        },
        {
          model: User,
          as: 'approver',
          attributes: ['id', 'name']
        }
      ]
    });

    res.json({
      message: 'Gallery item approved successfully',
      item: updatedItem
    });
  } catch (error) {
    console.error('Approve gallery item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/gallery/:id/reject
// @desc    Reject a gallery item
// @access  Private/Admin
router.put('/:id/reject', protect, admin, async (req, res) => {
  try {
    const { reason } = req.body;
    const item = await GalleryItem.findByPk(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    item.status = 'rejected';
    item.rejectionReason = reason || 'No reason provided';
    item.approvedBy = req.user.id;
    item.approvedAt = new Date();
    await item.save();

    const updatedItem = await GalleryItem.findByPk(item.id, {
      include: [
        {
          model: User,
          as: 'uploader',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    res.json({
      message: 'Gallery item rejected',
      item: updatedItem
    });
  } catch (error) {
    console.error('Reject gallery item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/gallery/:id
// @desc    Delete gallery item
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const item = await GalleryItem.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    // TODO: Delete the actual file from uploads folder
    await item.destroy();

    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Delete gallery item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
