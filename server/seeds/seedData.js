const sequelize = require('../config/database');
const User = require('../models/User');
const Event = require('../models/Event');
const Partner = require('../models/Partner');
const dotenv = require('dotenv');

dotenv.config();

const seedData = async () => {
  try {
    // Authenticate and sync
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL');

    // Force sync to clear tables
    await sequelize.sync({ force: true });
    console.log('Cleared existing data (tables dropped and recreated)');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@localaid.org',
      password: 'admin123', // hooks will hash it
      role: 'admin',
      isActive: true,
      phone: '1234567890'
    });
    console.log('Created admin user:', adminUser.email);

    // Create sample users
    await User.bulkCreate([
      {
        name: 'John Volunteer',
        email: 'volunteer@example.com',
        password: 'password123',
        role: 'volunteer',
        // bio: 'Passionate about helping the community' // Removed bio if not in model or added to model later
      },
      {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
        role: 'user'
      }
    ], { individualHooks: true }); // Important for password hashing!
    console.log('Created sample users');

    // Create sample events
    await Event.bulkCreate([
      {
        title: 'Community Health Fair',
        description: 'Join us for a free health screening and wellness education event. Services include blood pressure checks, HIV testing, and nutrition counseling.',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        location: 'Community Center, 123 Main Street, Springfield, IL 62701',
        category: 'other', // Mapped to existing enum options if needed, 'other' used for safety
        createdBy: adminUser.id,
        organizer: 'Local-AIDS',
        status: 'upcoming'
      },
      {
        title: 'Annual Fundraising Gala',
        description: 'Our biggest fundraising event of the year! Join us for an evening of dinner, dancing, and giving back to the community.',
        date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 1 month from now
        location: 'Grand Ballroom, 500 Luxury Ave, Springfield, IL 62701',
        category: 'fundraiser',
        createdBy: adminUser.id,
        organizer: 'Local-AIDS',
        status: 'upcoming'
      },
      {
        title: 'Volunteer Training Workshop',
        description: 'Learn how to become an effective volunteer with our comprehensive training program.',
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
        location: 'Local-AIDS Office, 456 Hope Street, Springfield, IL 62702',
        category: 'volunteer',
        createdBy: adminUser.id,
        organizer: 'Local-AIDS',
        status: 'upcoming'
      }
    ]);
    console.log('Created sample events');

    // Create sample partners
    await Partner.bulkCreate([
      {
        name: 'Springfield Hospital',
        description: 'Providing comprehensive healthcare services to our community for over 50 years.',
        category: 'corporate', // Mapped to enum
        logoUrl: 'https://placehold.co/400x200?text=Springfield+Hospital',
        websiteUrl: 'https://springfieldhospital.example.com',
        isActive: true
      },
      {
        name: 'Community Foundation',
        description: 'Supporting local nonprofits and community initiatives.',
        category: 'community-group',
        logoUrl: 'https://placehold.co/400x200?text=Community+Foundation',
        websiteUrl: 'https://communityfoundation.example.com',
        isActive: true
      },
      {
        name: 'Local Business Association',
        description: 'Connecting businesses with community organizations.',
        category: 'local-business',
        logoUrl: 'https://placehold.co/400x200?text=Local+Business+Assoc',
        websiteUrl: 'https://localbusiness.example.com',
        isActive: true
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
