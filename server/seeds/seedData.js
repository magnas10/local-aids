const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

// Import models
const User = require('../models/User');
const Event = require('../models/Event');
const Partner = require('../models/Partner');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/local-aids');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Event.deleteMany({});
    await Partner.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@localaid.org',
      password: 'admin123',
      role: 'admin',
      isVerified: true
    });
    console.log('Created admin user:', adminUser.email);

    // Create sample users
    const users = await User.create([
      {
        name: 'John Volunteer',
        email: 'volunteer@example.com',
        password: 'password123',
        role: 'volunteer',
        bio: 'Passionate about helping the community'
      },
      {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
        role: 'user'
      }
    ]);
    console.log('Created sample users');

    // Create sample events
    const events = await Event.create([
      {
        title: 'Community Health Fair',
        description: 'Join us for a free health screening and wellness education event. Services include blood pressure checks, HIV testing, and nutrition counseling.',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        time: '9:00 AM - 3:00 PM',
        location: {
          venue: 'Community Center',
          address: '123 Main Street',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62701'
        },
        category: 'community',
        organizer: adminUser._id,
        isFeatured: true,
        status: 'upcoming'
      },
      {
        title: 'Annual Fundraising Gala',
        description: 'Our biggest fundraising event of the year! Join us for an evening of dinner, dancing, and giving back to the community.',
        date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 1 month from now
        time: '6:00 PM - 10:00 PM',
        location: {
          venue: 'Grand Ballroom',
          address: '500 Luxury Ave',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62701'
        },
        category: 'fundraising',
        organizer: adminUser._id,
        maxAttendees: 200,
        isFeatured: true,
        status: 'upcoming'
      },
      {
        title: 'Volunteer Training Workshop',
        description: 'Learn how to become an effective volunteer with our comprehensive training program.',
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
        time: '10:00 AM - 2:00 PM',
        location: {
          venue: 'Local-AIDS Office',
          address: '456 Hope Street',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62702'
        },
        category: 'volunteer',
        organizer: adminUser._id,
        status: 'upcoming'
      }
    ]);
    console.log('Created sample events');

    // Create sample partners
    const partners = await Partner.create([
      {
        name: 'Springfield Hospital',
        description: 'Providing comprehensive healthcare services to our community for over 50 years.',
        category: 'healthcare',
        website: 'https://springfieldhospital.example.com',
        partnershipType: 'collaborator',
        isFeatured: true
      },
      {
        name: 'Community Foundation',
        description: 'Supporting local nonprofits and community initiatives.',
        category: 'nonprofit',
        website: 'https://communityfoundation.example.com',
        partnershipType: 'sponsor',
        isFeatured: true
      },
      {
        name: 'Local Business Association',
        description: 'Connecting businesses with community organizations.',
        category: 'corporate',
        website: 'https://localbusiness.example.com',
        partnershipType: 'supporter'
      }
    ]);
    console.log('Created sample partners');

    console.log('\n=== Seed Data Complete ===');
    console.log('Admin login: admin@localaid.org / admin123');
    console.log('Volunteer login: volunteer@example.com / password123');
    console.log('User login: jane@example.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
