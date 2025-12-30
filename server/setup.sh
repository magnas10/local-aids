#!/bin/bash

# Local-AIDS Backend Setup Script
# This script will help you set up the backend environment

echo "🚀 Local-AIDS Backend Setup"
echo "============================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo "✓ Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v) found${NC}"

# Check if PostgreSQL is installed
echo "✓ Checking PostgreSQL installation..."
if ! command -v psql &> /dev/null; then
    echo -e "${YELLOW}⚠ PostgreSQL not found in PATH${NC}"
    echo "Please install PostgreSQL from https://www.postgresql.org/"
    echo "Or run: brew install postgresql@14 (on macOS)"
    exit 1
fi
echo -e "${GREEN}✓ PostgreSQL found${NC}"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo ""
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo -e "${GREEN}✓ .env file created${NC}"
    echo -e "${YELLOW}⚠ Please update the .env file with your database credentials${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

# Install dependencies
echo ""
echo "📦 Installing npm dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencies installed successfully${NC}"
else
    echo -e "${RED}✗ Failed to install dependencies${NC}"
    exit 1
fi

# Check if database exists
echo ""
echo "🗄️  Checking database setup..."
DB_NAME=$(grep DB_NAME .env | cut -d '=' -f2)
DB_USER=$(grep DB_USER .env | cut -d '=' -f2)

if psql -U $DB_USER -lqt | cut -d \| -f 1 | grep -qw $DB_NAME; then
    echo -e "${GREEN}✓ Database '$DB_NAME' exists${NC}"
else
    echo -e "${YELLOW}⚠ Database '$DB_NAME' does not exist${NC}"
    echo "Do you want to create it now? (y/n)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        createdb -U $DB_USER $DB_NAME
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ Database created successfully${NC}"
        else
            echo -e "${RED}✗ Failed to create database${NC}"
            echo "Please create it manually: createdb -U $DB_USER $DB_NAME"
        fi
    fi
fi

# Generate JWT secret if needed
echo ""
echo "🔐 Checking JWT configuration..."
JWT_SECRET=$(grep JWT_SECRET .env | cut -d '=' -f2)
if [ -z "$JWT_SECRET" ] || [ "$JWT_SECRET" == "your-super-secret-jwt-key-change-this-in-production" ]; then
    echo -e "${YELLOW}⚠ JWT_SECRET needs to be updated${NC}"
    echo "Generating secure JWT secret..."
    NEW_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
    
    # Update .env file
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/JWT_SECRET=.*/JWT_SECRET=$NEW_SECRET/" .env
    else
        # Linux
        sed -i "s/JWT_SECRET=.*/JWT_SECRET=$NEW_SECRET/" .env
    fi
    echo -e "${GREEN}✓ JWT_SECRET generated and updated${NC}"
else
    echo -e "${GREEN}✓ JWT_SECRET is configured${NC}"
fi

# Ask if user wants to seed database
echo ""
echo "Do you want to seed the database with sample data? (y/n)"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo "📊 Seeding database..."
    npm run seed
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Database seeded successfully${NC}"
        echo ""
        echo "Default admin account:"
        echo "  Email: admin@localaids.org.au"
        echo "  Password: admin123"
    else
        echo -e "${YELLOW}⚠ Seeding skipped or failed${NC}"
    fi
fi

# Final instructions
echo ""
echo "============================"
echo -e "${GREEN}✓ Setup Complete!${NC}"
echo "============================"
echo ""
echo "To start the backend server:"
echo "  npm run dev    (development mode with auto-reload)"
echo "  npm start      (production mode)"
echo ""
echo "The server will run on: http://localhost:5001"
echo "Health check: http://localhost:5001/api/health"
echo ""
echo "For more information, see BACKEND_SETUP.md"
echo ""
