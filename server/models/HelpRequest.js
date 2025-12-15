const mongoose = require('mongoose');

const helpRequestSchema = new mongoose.Schema({
  // Personal Info
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  suburb: {
    type: String,
    required: [true, 'Suburb is required'],
    trim: true
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    enum: ['VIC', 'NSW', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']
  },
  postcode: {
    type: String,
    required: [true, 'Postcode is required'],
    trim: true
  },
  
  // Request Details
  helpType: {
    type: String,
    required: [true, 'Help type is required'],
    enum: ['transport', 'shopping', 'companionship', 'household', 'meals', 'medical', 'tech', 'other']
  },
  urgency: {
    type: String,
    required: [true, 'Urgency level is required'],
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  preferredDate: {
    type: String,
    required: false
  },
  preferredTime: {
    type: String,
    required: false
  },
  duration: {
    type: String,
    required: false
  },
  
  // Description
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  specialRequirements: {
    type: String,
    maxlength: [500, 'Special requirements cannot exceed 500 characters']
  },
  
  // Status and Meta
  status: {
    type: String,
    enum: ['pending', 'matched', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  assignedVolunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  showAsEvent: {
    type: Boolean,
    default: true
  },
  showInOpportunities: {
    type: Boolean,
    default: function() {
      return this.urgency === 'high' || this.urgency === 'urgent';
    }
  },
  
  // Additional
  howHeard: {
    type: String,
    required: false
  },
  agreeTerms: {
    type: Boolean,
    required: [true, 'Must agree to terms and conditions']
  },
  agreePrivacy: {
    type: Boolean,
    required: [true, 'Must agree to privacy policy']
  }
}, {
  timestamps: true
});

// Virtual for formatted location
helpRequestSchema.virtual('formattedLocation').get(function() {
  return `${this.suburb}, ${this.state} ${this.postcode}`;
});

// Virtual for priority level
helpRequestSchema.virtual('priority').get(function() {
  const priorityMap = {
    'low': 'Low',
    'normal': 'Medium', 
    'high': 'High',
    'urgent': 'Urgent'
  };
  return priorityMap[this.urgency];
});

// Virtual for category mapping
helpRequestSchema.virtual('category').get(function() {
  const categoryMap = {
    'transport': 'Transport',
    'shopping': 'Groceries',
    'companionship': 'Companionship',
    'household': 'Household',
    'meals': 'Meals',
    'medical': 'Medical',
    'tech': 'Tech Support',
    'other': 'Other'
  };
  return categoryMap[this.helpType];
});

module.exports = mongoose.model('HelpRequest', helpRequestSchema);