# Backend Setup Guide for Local-AIDS

## Prerequisites

Before starting, make sure you have installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** (for version control)

## Step 1: PostgreSQL Database Setup

### Install PostgreSQL (if not installed)

**macOS:**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Windows:**
Download and install from https://www.postgresql.org/download/windows/

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Create Database

Open PostgreSQL command line:
```bash
# macOS/Linux
psql postgres

# Windows (use pgAdmin or SQL Shell)
psql -U postgres
```

Create the database and user:
```sql
-- Create database
CREATE DATABASE local_aids;

-- Connect to the database
\c local_aids

-- Verify connection
\conninfo

-- Exit
\q
```

## Step 2: Backend Installation

Navigate to the server directory:
```bash
cd server
```

Install dependencies:
```bash
npm install
```

## Step 3: Environment Configuration

The `.env` file is already created. Update it with your settings:

```bash
# Open the .env file
nano .env
# or use any text editor
```

Update these values:
```env
# Server Configuration
PORT=5001
NODE_ENV=development

# PostgreSQL Connection
DB_HOST=localhost
DB_PORT=5432
DB_NAME=local_aids
DB_USER=sangamdevkota
DB_PASSWORD=           # Add your PostgreSQL password if you set one

# JWT Configuration
JWT_SECRET=generate-a-long-random-secret-key-here-for-security
JWT_EXPIRES_IN=7d

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000
```

**Important:** Generate a secure JWT secret:
```bash
# Generate a random secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Step 4: Initialize Database Tables

The backend will automatically create tables on first run, or you can seed the database:

```bash
# Run database migrations (auto-creates tables)
npm run dev

# OR seed with sample data
npm run seed
```

## Step 5: Start the Backend Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server should start on `http://localhost:5001`

## Step 6: Verify Backend is Running

Open your browser or use curl:
```bash
curl http://localhost:5001/api/health
```

You should see:
```json
{"status":"OK","message":"Server is running"}
```

## Available API Endpoints

Once running, your backend provides these endpoints:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event (admin)
- `GET /api/events/:id` - Get event by ID
- `PUT /api/events/:id` - Update event (admin)
- `DELETE /api/events/:id` - Delete event (admin)

### Donations
- `GET /api/donations` - Get all donations
- `POST /api/donations` - Create donation
- `GET /api/donations/:id` - Get donation by ID

### Messages
- `GET /api/messages` - Get messages
- `POST /api/messages` - Send message
- `PUT /api/messages/:id` - Update message status

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get contact submissions (admin)

### Gallery
- `GET /api/gallery` - Get gallery items
- `POST /api/gallery` - Upload image (admin)
- `DELETE /api/gallery/:id` - Delete image (admin)

### Partners
- `GET /api/partners` - Get partners
- `POST /api/partners` - Add partner (admin)

### Help Requests
- `GET /api/help-requests` - Get help requests
- `POST /api/help-requests` - Create help request
- `PUT /api/help-requests/:id` - Update help request

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark as read

## Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution:**
- Ensure PostgreSQL is running: `brew services list` (macOS) or `sudo systemctl status postgresql` (Linux)
- Check your database credentials in `.env`
- Verify database exists: `psql -l`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5001
```
**Solution:**
```bash
# Find process using port 5001
lsof -i :5001

# Kill the process
kill -9 <PID>

# Or change PORT in .env file
```

### JWT Secret Error
```
Error: JWT_SECRET must be defined
```
**Solution:**
- Generate a strong secret: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
- Add it to `.env` file as `JWT_SECRET=<generated-secret>`

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Development Workflow

1. **Start Backend:**
   ```bash
   cd server
   npm run dev
   ```

2. **Start Frontend (in another terminal):**
   ```bash
   cd ..
   npm start
   ```

3. **Test API:**
   - Backend: http://localhost:5001
   - Frontend: http://localhost:3000

## Seeding Sample Data

To populate the database with sample data:

```bash
npm run seed
```

This creates:
- 3 sample users (admin, volunteer, regular user)
- 5 sample events
- 3 sample donations
- 2 sample partners
- Sample gallery items

**Default Admin Account:**
- Email: admin@localaids.org.au
- Password: admin123

## Testing the Backend

### Using cURL:

**Register a new user:**
```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "user"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Get Events:**
```bash
curl http://localhost:5001/api/events
```

### Using Postman:
1. Download [Postman](https://www.postman.com/downloads/)
2. Import the API collection (if provided)
3. Test each endpoint

## Production Deployment

For production deployment:

1. **Update Environment:**
   ```env
   NODE_ENV=production
   PORT=5001
   CLIENT_URL=https://your-production-domain.com
   ```

2. **Use Process Manager:**
   ```bash
   npm install -g pm2
   pm2 start server.js --name "local-aids-api"
   pm2 startup
   pm2 save
   ```

3. **Set up HTTPS** with Let's Encrypt or similar

4. **Use Environment-specific Database** (not localhost)

## Useful Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Seed database
npm run seed

# Check running processes
ps aux | grep node

# View logs (if using pm2)
pm2 logs local-aids-api

# Restart server (if using pm2)
pm2 restart local-aids-api
```

## Next Steps

1. ✅ Install PostgreSQL
2. ✅ Create database
3. ✅ Install dependencies
4. ✅ Configure .env file
5. ✅ Start the server
6. ✅ Test API endpoints
7. ✅ Seed sample data (optional)
8. ✅ Connect frontend to backend

## Support

For issues or questions:
- Check the troubleshooting section
- Review server logs: `npm run dev` (watch console)
- Check database connection: `psql local_aids`

---

**Your backend should now be running on http://localhost:5001** 🚀
