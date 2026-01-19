const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GalleryItem = sequelize.define('GalleryItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'general'
  },
  uploadedBy: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending'
  },
  rejectionReason: {
    type: DataTypes.TEXT
  },
  approvedBy: {
    type: DataTypes.INTEGER
  },
  approvedAt: {
    type: DataTypes.DATE
  }
});

// Define associations
GalleryItem.associate = (models) => {
  GalleryItem.belongsTo(models.User, {
    foreignKey: 'uploadedBy',
    as: 'uploader'
  });
  
  GalleryItem.belongsTo(models.User, {
    foreignKey: 'approvedBy',
    as: 'approver'
  });
};

module.exports = GalleryItem;
