const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

let sequelize;

// Use DATABASE_URL for production (Render, Railway, etc.)
if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
} else {
    // Local development
    sequelize = new Sequelize(
        process.env.DB_NAME || 'local_aids',
        process.env.DB_USER || 'sangamdevkota',
        process.env.DB_PASSWORD || null,
        {
            host: process.env.DB_HOST || 'localhost',
            dialect: 'postgres',
            logging: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }
    );
}

module.exports = sequelize;
