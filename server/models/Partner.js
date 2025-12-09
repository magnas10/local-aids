const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Partner name is required'],
    trim: true
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  logo: {
    type: String,
    default: null
  },
  website: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['healthcare', 'nonprofit', 'government', 'corporate', 'education', 'community', 'other'],
    default: 'nonprofit'
  },
  contact: {
    name: String,
    email: String,
    phone: String
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  partnershipType: {
    type: String,
    enum: ['sponsor', 'collaborator', 'affiliate', 'supporter'],
    default: 'supporter'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Partner', partnerSchema);
