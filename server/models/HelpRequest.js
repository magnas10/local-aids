const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HelpRequest = sequelize.define('HelpRequest', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // Personal Info
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 100]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  suburb: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['VIC', 'NSW', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']]
    }
  },
  postcode: {
    type: DataTypes.STRING,
    allowNull: false
  },

  // Request Details
  helpType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['transport', 'shopping', 'companionship', 'household', 'meals', 'medical', 'tech', 'other']]
    }
  },
  urgency: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'normal',
    validate: {
      isIn: [['low', 'normal', 'high', 'urgent']]
    }
  },
  preferredDate: {
    type: DataTypes.STRING
  },
  preferredTime: {
    type: DataTypes.STRING
  },
  duration: {
    type: DataTypes.STRING
  },

  // Description
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [1, 1000]
    }
  },
  specialRequirements: {
    type: DataTypes.TEXT,
    validate: {
      len: [0, 500]
    }
  },

  // Status and Meta
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'matched', 'in-progress', 'completed', 'cancelled']]
    }
  },
  assignedVolunteerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  showAsEvent: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  showInOpportunities: {
    type: DataTypes.BOOLEAN,
    defaultValue: false // Logic moved to setter/hooks if needed, or calculated by caller
  },

  // Additional
  howHeard: {
    type: DataTypes.STRING
  },
  agreeTerms: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    validate: {
      isTrue(value) {
        if (!value) throw new Error('Must agree to terms and conditions');
      }
    }
  },
  agreePrivacy: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    validate: {
      isTrue(value) {
        if (!value) throw new Error('Must agree to privacy policy');
      }
    }
  }
}, {
  getterMethods: {
    formattedLocation() {
      return `${this.suburb}, ${this.state} ${this.postcode}`;
    },
    priority() {
      const priorityMap = {
        'low': 'Low',
        'normal': 'Medium',
        'high': 'High',
        'urgent': 'Urgent'
      };
      return priorityMap[this.urgency];
    },
    category() {
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
    }
  },
  hooks: {
    beforeSave: (request) => {
      // Auto-set showInOpportunities based on urgency
      if (request.urgency === 'high' || request.urgency === 'urgent') {
        request.showInOpportunities = true;
      }
    }
  }
});

module.exports = HelpRequest;