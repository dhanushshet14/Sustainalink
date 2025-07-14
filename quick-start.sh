#!/bin/bash

# SustainaLink Quick Start Script
echo "🌱 SustainaLink Quick Start"
echo "=========================="

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "🔍 Checking prerequisites..."

if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

if ! command_exists npm; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ Node.js $(node -v) and npm $(npm -v) are installed"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the SustainaLink project root directory"
    exit 1
fi

echo "📦 Installing frontend dependencies..."
npm install

echo "📦 Installing backend dependencies..."
cd backend
npm install

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "📝 Creating backend .env file..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env with your configuration before continuing"
    echo ""
    echo "Required variables to set:"
    echo "- MONGODB_URI (MongoDB connection string)"
    echo "- JWT_SECRET (secure random string)"
    echo "- GOOGLE_API_KEY (Google Gemini AI API key)"
    echo ""
    read -p "Press Enter after configuring .env file..."
fi

# Build backend
echo "🔨 Building backend..."
npm run build

# Go back to root
cd ..

# Check if user wants to seed data
echo ""
read -p "🌱 Do you want to seed sample data? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding sample data..."
    cd backend
    npm run seed
    cd ..
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Start the backend: npm run backend:dev (in one terminal)"
echo "2. Start the frontend: npm run dev (in another terminal)"
echo ""
echo "🚀 URLs:"
echo "- Frontend: http://localhost:9002"
echo "- Backend API: http://localhost:5000"
echo "- API Docs: http://localhost:5000/api-docs"
echo ""
echo "👥 Sample accounts (if seeded):"
echo "- Consumer: consumer@example.com (password: password123)"
echo "- Supplier: supplier@example.com (password: password123)"
echo "- Admin: admin@example.com (password: password123)"
echo ""
echo "🔧 Useful commands:"
echo "- npm run backend:dev - Start backend development server"
echo "- npm run dev - Start frontend development server"
echo "- npm run backend:seed - Seed sample data"
