const sequelize = require('../config/database');
const User = require('../models/User');
const GalleryItem = require('../models/GalleryItem');

// Set up associations
GalleryItem.belongsTo(User, {
  foreignKey: 'uploadedBy',
  as: 'uploader'
});

GalleryItem.belongsTo(User, {
  foreignKey: 'approvedBy',
  as: 'approver'
});

const seedGalleryImages = async () => {
  try {
    console.log('🌱 Starting gallery seed...');

    // Get an admin user to approve images
    const adminUser = await User.findOne({ where: { role: 'admin' } });
    
    if (!adminUser) {
      console.error('❌ No admin user found. Please create an admin user first.');
      return;
    }

    // Get a regular user for uploading
    const regularUser = await User.findOne({ where: { role: 'user' } });
    const uploaderId = regularUser ? regularUser.id : adminUser.id;

    console.log(`✓ Using admin: ${adminUser.name} (ID: ${adminUser.id})`);
    console.log(`✓ Using uploader: ${regularUser?.name || adminUser.name} (ID: ${uploaderId})`);

    const galleryData = [
      {
        title: 'Community Food Drive - Melbourne',
        description: 'Our volunteers distributed over 500 food packages to families in need across Melbourne. The community support was overwhelming!',
        imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop&q=80',
        category: 'food-drive',
        uploadedBy: uploaderId,
        status: 'approved',
        approvedBy: adminUser.id,
        approvedAt: new Date(),
        featured: true,
        tags: ['food', 'community', 'melbourne', 'volunteers']
      },
      {
        title: 'Beach Cleanup Initiative',
        description: 'Over 120 volunteers joined us for a beach cleanup day at Bondi Beach. Together we collected 500kg of waste!',
        imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop&q=80',
        category: 'environment',
        uploadedBy: uploaderId,
        status: 'approved',
        approvedBy: adminUser.id,
        approvedAt: new Date(),
        featured: true,
        tags: ['environment', 'beach', 'cleanup', 'bondi']
      },
      {
        title: 'After School Tutoring Program',
        description: 'Our education volunteers helping students with homework and exam preparation at the community center.',
        imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop&q=80',
        category: 'education',
        uploadedBy: uploaderId,
        status: 'approved',
        approvedBy: adminUser.id,
        approvedAt: new Date(),
        tags: ['education', 'tutoring', 'students', 'community']
      },
      {
        title: 'Senior Tech Workshop',
        description: 'Teaching seniors how to use smartphones and video calls to stay connected with their families.',
        imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&h=600&fit=crop&q=80',
        category: 'elderly-care',
        uploadedBy: uploaderId,
        status: 'approved',
        approvedBy: adminUser.id,
        approvedAt: new Date(),
        tags: ['elderly', 'technology', 'workshop', 'seniors']
      },
      {
        title: 'Flood Relief Operations',
        description: 'Emergency response team providing essential supplies and support to flood-affected communities in Lismore.',
        imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop&q=80',
        category: 'disaster-relief',
        uploadedBy: uploaderId,
        status: 'approved',
        approvedBy: adminUser.id,
        approvedAt: new Date(),
        tags: ['disaster', 'flood', 'relief', 'emergency']
      },
      {
        title: 'Community Garden Project',
        description: 'Local residents working together to create a beautiful community garden. Fresh vegetables for everyone!',
        imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop&q=80',
        category: 'community',
        uploadedBy: uploaderId,
        status: 'approved',
        approvedBy: adminUser.id,
        approvedAt: new Date(),
        tags: ['garden', 'community', 'vegetables', 'sustainability']
      },
      {
        title: 'Meals on Wheels Program',
        description: 'Delivering hot meals to elderly residents who are unable to cook for themselves.',
        imageUrl: 'https://images.unsplash.com/photo-1609234656388-0ff363383899?w=800&h=600&fit=crop&q=80',
        category: 'elderly-care',
        uploadedBy: uploaderId,
        status: 'approved',
        approvedBy: adminUser.id,
        approvedAt: new Date(),
        tags: ['elderly', 'meals', 'care', 'delivery']
      },
      {
        title: 'Youth Mentorship Program',
        description: 'Young people being mentored by professionals to help them achieve their career goals.',
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80',
        category: 'education',
        uploadedBy: uploaderId,
        status: 'approved',
        approvedBy: adminUser.id,
        approvedAt: new Date(),
        tags: ['youth', 'mentorship', 'education', 'careers']
      },
      {
        title: 'Community Health Fair',
        description: 'Free health screenings and wellness information for community members at our annual health fair.',
        imageUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=600&fit=crop&q=80',
        category: 'health',
        uploadedBy: uploaderId,
        status: 'approved',
        approvedBy: adminUser.id,
        approvedAt: new Date(),
        tags: ['health', 'wellness', 'community', 'screening']
      },
      {
        title: 'Tree Planting Initiative',
        description: 'Community members planting 1000 trees to combat climate change and improve air quality.',
        imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop&q=80',
        category: 'environment',
        uploadedBy: uploaderId,
        status: 'approved',
        approvedBy: adminUser.id,
        approvedAt: new Date(),
        tags: ['trees', 'environment', 'planting', 'climate']
      },
      {
        title: 'Homeless Support Outreach',
        description: 'Volunteers providing meals, clothing, and support to homeless individuals in the city.',
        imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop&q=80',
        category: 'community',
        uploadedBy: uploaderId,
        status: 'approved',
        approvedBy: adminUser.id,
        approvedAt: new Date(),
        tags: ['homeless', 'support', 'outreach', 'community']
      },
      {
        title: 'Kids Reading Circle',
        description: 'Weekly reading sessions helping children develop literacy skills and a love for books.',
        imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop&q=80',
        category: 'education',
        uploadedBy: uploaderId,
        status: 'approved',
        approvedBy: adminUser.id,
        approvedAt: new Date(),
        tags: ['reading', 'children', 'literacy', 'education']
      }
    ];

    // Clear existing gallery items
    await GalleryItem.destroy({ where: {} });
    console.log('✓ Cleared existing gallery items');

    // Insert new gallery items
    for (const data of galleryData) {
      await GalleryItem.create(data);
      console.log(`✓ Added: ${data.title}`);
    }

    console.log(`\n🎉 Successfully seeded ${galleryData.length} gallery images!`);
    console.log('✓ All images are approved and ready to view');
    console.log('\n📷 Visit http://localhost:3000/gallery to see them!');

  } catch (error) {
    console.error('❌ Error seeding gallery:', error);
  } finally {
    await sequelize.close();
  }
};

// Run the seed
seedGalleryImages();
