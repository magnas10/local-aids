const sequelize = require('./config/database');

async function migrateAddressField() {
  try {
    console.log('Starting migration of address field...');
    
    // First, add the new bio column
    await sequelize.query(`
      ALTER TABLE "Users" 
      ADD COLUMN IF NOT EXISTS "bio" TEXT;
    `);
    console.log('✓ Added bio column');
    
    // Drop the old address column
    await sequelize.query(`
      ALTER TABLE "Users" 
      DROP COLUMN IF EXISTS "address" CASCADE;
    `);
    console.log('✓ Dropped old address column');
    
    // Add the new address column as JSONB
    await sequelize.query(`
      ALTER TABLE "Users" 
      ADD COLUMN "address" JSONB DEFAULT '{}';
    `);
    console.log('✓ Added new address column as JSONB');
    
    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateAddressField();
