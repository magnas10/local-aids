const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');
const GalleryItem = require('../models/GalleryItem');
const { protect, admin } = require('../middleware/auth');

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
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter
});

// @route   GET /api/gallery
// @desc    Get all gallery items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const { category, featured } = req.query;

    const query = { isPublic: true };
    if (category) query.category = category;
    if (featured === 'true') query.isFeatured = true;

    const items = await GalleryItem.find(query)
      .populate('uploadedBy', 'name')
      .populate('event', 'title')
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await GalleryItem.countDocuments(query);

    res.json({
      items,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total
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
// @access  Private/Admin
router.post('/', protect, admin, upload.single('image'), [
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

    const { title, description, category, event, tags, isPublic, isFeatured } = req.body;

    const item = new GalleryItem({
      title,
      description,
      imageUrl: `/uploads/gallery/${req.file.filename}`,
      category: category || 'other',
      event: event || null,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      uploadedBy: req.user.id,
      isPublic: isPublic !== 'false',
      isFeatured: isFeatured === 'true'
    });

    await item.save();
    await item.populate('uploadedBy', 'name');

    res.status(201).json({
      message: 'Image uploaded successfully',
      item
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
    const { title, description, category, tags, isPublic, isFeatured, order } = req.body;

    const updateFields = {};
    if (title) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (category) updateFields.category = category;
    if (tags) updateFields.tags = tags;
    if (isPublic !== undefined) updateFields.isPublic = isPublic;
    if (isFeatured !== undefined) updateFields.isFeatured = isFeatured;
    if (order !== undefined) updateFields.order = order;

    const item = await GalleryItem.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    ).populate('uploadedBy', 'name');

    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    res.json({
      message: 'Gallery item updated successfully',
      item
    });
  } catch (error) {
    console.error('Update gallery item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/gallery/:id
// @desc    Delete gallery item
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const item = await GalleryItem.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    // TODO: Delete the actual file from uploads folder

    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Delete gallery item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
