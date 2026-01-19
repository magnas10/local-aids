const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Newsletter = sequelize.define('Newsletter', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Please provide a valid email address'
      }
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  subscribedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  unsubscribedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'newsletters',
  timestamps: true
});

module.exports = Newsletter;
