const sequelize = require('./config/database');

async function cleanup() {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL');
    
    // Drop all tables to clean state
    await sequelize.query('DROP SCHEMA public CASCADE;');
    await sequelize.query('CREATE SCHEMA public;');
    console.log('Database cleaned');
    
    process.exit(0);
  } catch (error) {
    console.error('Cleanup error:', error);
    process.exit(1);
  }
}

cleanup();
