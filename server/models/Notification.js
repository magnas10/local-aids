const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  recipientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['request_update', 'new_message', 'event_reminder', 'system', 'volunteer_match']]
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  relatedId: {
    type: DataTypes.STRING // ID of related item (request, event, etc), kept as string to be flexible
  },
  relatedModel: {
    type: DataTypes.STRING // 'HelpRequest', 'Event', 'Message', etc.
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Notification;