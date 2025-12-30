const sequelize = require('./config/database');
const User = require('./models/User');
const GalleryItem = require('./models/GalleryItem');

// Set up associations manually
GalleryItem.belongsTo(User, {
  foreignKey: 'uploadedBy',
  as: 'uploader'
});

GalleryItem.belongsTo(User, {
  foreignKey: 'approvedBy',
  as: 'approver'
});

// Sync database
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✓ Database synced successfully');
    console.log('✓ GalleryItem model updated with approval fields');
    process.exit(0);
  })
  .catch(err => {
    console.error('✗ Error syncing database:', err);
    process.exit(1);
  });
