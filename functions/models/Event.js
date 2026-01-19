const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Title is required' }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Description is required' }
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Date is required' }
    }
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Location is required' }
    }
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['fundraiser', 'workshop', 'social', 'volunteer', 'other']]
    }
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: 'default-event.jpg'
  },
  organizer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  capacity: {
    type: DataTypes.INTEGER
  },
  registeredAttendees: {
    type: DataTypes.ARRAY(DataTypes.INTEGER), // Array of User IDs
    defaultValue: []
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'upcoming',
    validate: {
      isIn: [['upcoming', 'completed', 'cancelled']]
    }
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
});

module.exports = Event;
