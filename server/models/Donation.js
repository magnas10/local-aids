const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null // null for anonymous donations
  },
  donorInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    }
  },
  amount: {
    type: Number,
    required: [true, 'Donation amount is required'],
    min: [1, 'Donation must be at least $1']
  },
  currency: {
    type: String,
    default: 'USD'
  },
  type: {
    type: String,
    enum: ['one-time', 'monthly', 'annual'],
    default: 'one-time'
  },
  purpose: {
    type: String,
    enum: ['general', 'medical', 'education', 'housing', 'emergency', 'specific-campaign'],
    default: 'general'
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    default: null
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'bank', 'paypal', 'check', 'cash', 'other'],
    default: 'card'
  },
  paymentId: {
    type: String // Transaction ID from payment processor
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  receiptSent: {
    type: Boolean,
    default: false
  },
  receiptNumber: String
}, {
  timestamps: true
});

// Generate receipt number before saving
donationSchema.pre('save', function(next) {
  if (!this.receiptNumber && this.status === 'completed') {
    this.receiptNumber = `DON-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }
  next();
});

module.exports = mongoose.model('Donation', donationSchema);
