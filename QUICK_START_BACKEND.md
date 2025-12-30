# 🚀 Quick Start: Backend Setup

## Prerequisites Check

1. **PostgreSQL** - Database server
2. **Node.js** - JavaScript runtime

## Step-by-Step Setup

### 1. Open Terminal and navigate to server folder:
\`\`\`bash
cd "/Users/sangamdevkota/Desktop/projext 2/local-aids/server"
\`\`\`

### 2. Run the automatic setup script:
\`\`\`bash
./setup.sh
\`\`\`

### 3. OR Manual Setup:

#### Install Dependencies:
\`\`\`bash
npm install
\`\`\`

#### Create PostgreSQL Database:
\`\`\`bash
# Login to PostgreSQL
psql postgres

# In PostgreSQL prompt:
CREATE DATABASE local_aids;
\q
\`\`\`

#### Start the Server:
\`\`\`bash
npm run dev
\`\`\`

### 4. Verify It's Working:
Open browser: http://localhost:5001/api/health

You should see: {"status":"OK","message":"Server is running"}

## Troubleshooting

### PostgreSQL Not Installed?
**macOS:**
\`\`\`bash
brew install postgresql@14
brew services start postgresql@14
\`\`\`

**Ubuntu/Linux:**
\`\`\`bash
sudo apt install postgresql
sudo systemctl start postgresql
\`\`\`

### Port 5001 Already in Use?
Change PORT in .env file to 5002 or another available port

## Next Steps

1. ✅ Backend running on http://localhost:5001
2. ✅ Start frontend: \`npm start\` (in root directory)
3. ✅ Test full app: http://localhost:3000

For detailed docs, see: BACKEND_SETUP.md
