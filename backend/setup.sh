#!/bin/bash

# SustainaLink Backend Setup Script
echo "🌱 Setting up SustainaLink Backend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm $(npm -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Check if .env exists, if not copy from .env.example
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created. Please edit it with your configuration."
    echo ""
    echo "🔧 Required environment variables to configure:"
    echo "   - MONGODB_URI (MongoDB connection string)"
    echo "   - JWT_SECRET (secure random string)"
    echo "   - GOOGLE_API_KEY (Google Gemini AI API key)"
    echo ""
else
    echo "✅ .env file already exists"
fi

# Check if MongoDB is running (optional)
echo "🔍 Checking MongoDB connection..."
if command -v mongosh &> /dev/null; then
    if mongosh --eval "db.runCommand('ping')" --quiet >/dev/null 2>&1; then
        echo "✅ MongoDB is running and accessible"
    else
        echo "⚠️  MongoDB is not running or not accessible"
        echo "   Please start MongoDB or update MONGODB_URI in .env for remote connection"
    fi
elif command -v mongo &> /dev/null; then
    if mongo --eval "db.runCommand('ping')" --quiet >/dev/null 2>&1; then
        echo "✅ MongoDB is running and accessible"
    else
        echo "⚠️  MongoDB is not running or not accessible"
        echo "   Please start MongoDB or update MONGODB_URI in .env for remote connection"
    fi
else
    echo "⚠️  MongoDB CLI not found. Make sure MongoDB is installed and running"
    echo "   Or configure MONGODB_URI in .env for remote MongoDB Atlas connection"
fi

# Build TypeScript
echo "🔨 Building TypeScript..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ TypeScript build failed"
    exit 1
fi

echo "✅ TypeScript build successful"

echo ""
echo "🎉 SustainaLink Backend setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env file with your configuration"
echo "2. Ensure MongoDB is running (local) or configured (Atlas)"
echo "3. Get Google Gemini AI API key from: https://makersuite.google.com/app/apikey"
echo "4. Start the development server: npm run dev"
echo ""
echo "🚀 Development server will be available at: http://localhost:5000"
echo "📚 API documentation will be available at: http://localhost:5000/api-docs"
echo ""
echo "🔧 Useful commands:"
echo "   npm run dev     - Start development server with hot reload"
echo "   npm run build   - Build for production"
echo "   npm start       - Start production server"
echo "   npm run lint    - Check code quality"
echo "   npm test        - Run tests"
