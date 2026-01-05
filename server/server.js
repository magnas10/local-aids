const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const sequelize = require('./config/database');

// Load environment variables
dotenv.config();

// Import models to set up associations
const User = require('./models/User');
const GalleryItem = require('./models/GalleryItem');
const Event = require('./models/Event');
const Donation = require('./models/Donation');
const Message = require('./models/Message');
const Conversation = require('./models/Conversation');
const ConversationParticipant = require('./models/ConversationParticipant');
const HelpRequest = require('./models/HelpRequest');
const Notification = require('./models/Notification');

// Set up associations
GalleryItem.belongsTo(User, {
  foreignKey: 'uploadedBy',
  as: 'uploader'
});

GalleryItem.belongsTo(User, {
  foreignKey: 'approvedBy',
  as: 'approver'
});

User.hasMany(GalleryItem, {
  foreignKey: 'uploadedBy',
  as: 'uploadedGalleryItems'
});

// Conversation associations
Conversation.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });
Conversation.hasMany(ConversationParticipant, { foreignKey: 'conversationId', as: 'participants' });
Conversation.hasMany(Message, { foreignKey: 'conversationId', as: 'messages' });

ConversationParticipant.belongsTo(User, { foreignKey: 'userId', as: 'user' });
ConversationParticipant.belongsTo(Conversation, { foreignKey: 'conversationId', as: 'conversation' });

Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
Message.belongsTo(Conversation, { foreignKey: 'conversationId', as: 'conversation' });
Message.belongsTo(Message, { foreignKey: 'replyToId', as: 'replyTo' });

// Notification associations
Notification.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });
User.hasMany(Notification, { foreignKey: 'createdBy', as: 'createdNotifications' });

// Donation associations
Donation.belongsTo(User, { foreignKey: 'userId', as: 'donor' });
User.hasMany(Donation, { foreignKey: 'userId', as: 'donations' });

// Event associations
Event.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });
User.hasMany(Event, { foreignKey: 'createdBy', as: 'createdEvents' });

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/events');
const donationRoutes = require('./routes/donations');
const messageRoutes = require('./routes/messages');
const contactRoutes = require('./routes/contact');
const galleryRoutes = require('./routes/gallery');
const partnerRoutes = require('./routes/partners');
const helpRequestRoutes = require('./routes/helpRequests');
const notificationRoutes = require('./routes/notifications');
const newsletterRoutes = require('./routes/newsletter');

const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:3000',
  'https://local-aid-dcbca.web.app',
  'https://local-aid-dcbca.firebaseapp.com',
  process.env.CLIENT_URL
].filter(Boolean);

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, false);
  },
  credentials: true
}));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/help-requests', helpRequestRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Root endpoint (for Render health checks)
app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'Local Aid API Server is running' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Database connection & Sync
const PORT = process.env.PORT || 5001;

sequelize.sync({ alter: true }) // Sync models with database
  .then(() => {
    console.log('PostgreSQL Database Connected & Synced');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to PostgreSQL:', err);
  });

module.exports = app;
