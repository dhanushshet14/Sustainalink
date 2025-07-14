# SustainaLink 🌱

A comprehensive sustainability platform that connects consumers, suppliers, and businesses to promote transparency in supply chains and encourage sustainable practices through AI-powered insights and gamification.

## 🌟 Features

- **🔍 Supply Chain Transparency**: Track products from origin to consumer with complete ESG metrics
- **🤖 AI-Powered Insights**: Google Gemini AI integration for sustainability recommendations and analysis
- **📊 ESG Metrics Dashboard**: Comprehensive Environmental, Social, and Governance tracking
- **🎮 Gamification**: Rewards, badges, NFTs, and leaderboards for sustainable actions
- **👥 Multi-User Platform**: Support for consumers, suppliers, and administrators
- **📱 Responsive Design**: Modern UI built with Next.js and Tailwind CSS
- **🔒 Secure Authentication**: JWT-based auth with role-based access control

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- MongoDB (local or Atlas)
- Google Gemini AI API key

### One-Command Setup
```bash
./quick-start.sh
```

This will:
1. Install all dependencies
2. Set up the backend environment
3. Build the TypeScript backend
4. Optionally seed sample data
5. Provide instructions to start both servers

### Manual Setup

#### 1. Install Dependencies
```bash
# Frontend dependencies
npm install

# Backend dependencies
npm run backend:install
```

#### 2. Configure Backend
```bash
# Set up backend environment
cd backend
cp .env.example .env
# Edit .env with your configuration
```

#### 3. Start Services
```bash
# Terminal 1 - Backend
npm run backend:dev

# Terminal 2 - Frontend  
npm run dev
```

## 🏗️ Architecture

### Frontend (Next.js)
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom sustainability theme
- **Components**: Radix UI primitives with custom designs
- **AI Integration**: Google Genkit for client-side AI features
- **State Management**: React Context + custom hooks

### Backend (Express.js)
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcrypt hashing
- **AI**: Google Gemini AI for recommendations and analysis
- **API Docs**: Swagger/OpenAPI 3.0
- **Security**: Helmet, CORS, rate limiting, input validation

## 📁 Project Structure

```
sustainalink/
├── 📱 Frontend (Next.js)
│   ├── src/app/              # App router pages
│   ├── src/components/       # Reusable components
│   ├── src/ai/              # AI integration (Genkit)
│   └── src/lib/             # Utilities and configurations
├── 🖥️ Backend (Express.js)
│   ├── src/controllers/      # Route controllers
│   ├── src/models/          # Database models
│   ├── src/routes/          # API routes
│   ├── src/middleware/      # Custom middleware
│   ├── src/utils/           # Utility functions
│   └── src/seeders/         # Sample data
├── 📚 Documentation
│   ├── INTEGRATION_GUIDE.md # Frontend-Backend integration
│   ├── backend/README.md    # Backend documentation
│   └── docs/blueprint.md    # Project blueprint
└── 🛠️ Scripts
    ├── quick-start.sh       # One-command setup
    └── backend/setup.sh     # Backend setup
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### AI Features
- `POST /api/ai/recommendations` - Generate sustainability recommendations
- `POST /api/ai/chat` - Chat with AI assistant
- `POST /api/ai/analyze-product` - Analyze product sustainability
- `POST /api/ai/generate-esg-report` - Generate ESG reports

### Products & Suppliers
- `GET /api/products` - List products with sustainability metrics
- `GET /api/suppliers` - List suppliers with ESG scores
- `POST /api/products` - Create new product (suppliers only)

### Gamification
- `GET /api/rewards` - Get user rewards and achievements
- `GET /api/rewards/leaderboard` - View sustainability leaderboard
- `POST /api/rewards/claim` - Claim earned rewards

## 🎮 Key Features

### AI-Powered Sustainability
- **Personalized Recommendations**: Based on user profile and current metrics
- **Product Analysis**: AI evaluation of product sustainability
- **Supply Chain Optimization**: AI-driven efficiency improvements
- **ESG Report Generation**: Automated comprehensive reporting

### Supply Chain Transparency
- **Product Journey Tracking**: From raw materials to consumer
- **QR Code Scanning**: Instant product sustainability information
- **Supplier Verification**: ESG score-based supplier assessment
- **Certification Tracking**: Real-time validation of sustainability certifications

### Gamification System
- **Points & Levels**: Earn points for sustainable actions
- **Badges & Achievements**: Recognition for environmental milestones
- **NFT Rewards**: Unique digital collectibles for major achievements
- **Leaderboards**: Community-driven sustainability competition

### Dashboard Analytics
- **Carbon Footprint Tracking**: Personal and organizational metrics
- **Waste Reduction Monitoring**: Track and reduce waste generation
- **Sustainability Scoring**: Comprehensive ESG performance metrics
- **Trend Analysis**: Historical data and improvement tracking

## 🌍 Sample Data

The platform includes comprehensive sample data:

### Users
- **Consumer Account**: `consumer@example.com` / `password123`
- **Supplier Account**: `supplier@example.com` / `password123`  
- **Admin Account**: `admin@example.com` / `password123`

### Sample Products
- Eco-Friendly Water Bottle (95% recyclability score)
- Organic Cotton T-Shirt (Fair Trade certified)
- Solar-Powered Electronics (80% renewable energy)

### Sample Suppliers
- EcoTech Manufacturing (ESG Score: 85/100)
- Sustainable Textiles Co. (ESG Score: 81/100)
- Green Energy Solutions (ESG Score: 92/100)

## 🔧 Development

### Available Scripts
```bash
# Frontend
npm run dev              # Start Next.js development server
npm run build            # Build for production
npm run lint             # Run ESLint

# Backend
npm run backend:dev      # Start Express development server
npm run backend:build    # Build TypeScript backend
npm run backend:seed     # Seed sample data

# AI Integration
npm run genkit:dev       # Start Genkit AI development server
npm run genkit:watch     # Watch mode for AI development
```

### Environment Variables

#### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
GOOGLE_API_KEY=your_google_genkit_api_key
```

#### Backend (.env)
```bash
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/sustainalink
JWT_SECRET=your_super_secret_jwt_key
GOOGLE_API_KEY=your_google_gemini_api_key
CORS_ORIGINS=http://localhost:3000,http://localhost:9002
```

## 📖 Documentation

- **[Integration Guide](INTEGRATION_GUIDE.md)**: Complete frontend-backend integration
- **[Backend Documentation](backend/README.md)**: API documentation and setup
- **[Project Blueprint](docs/blueprint.md)**: Original project specifications
- **[API Documentation](http://localhost:5000/api-docs)**: Interactive Swagger docs (when backend is running)

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Use MongoDB Atlas for production database
3. Deploy to platforms like Heroku, Railway, or AWS
4. Configure proper CORS origins

### Frontend Deployment
1. Build the Next.js application: `npm run build`
2. Deploy to Vercel, Netlify, or similar platforms
3. Update API URLs in environment variables

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Google Genkit** - AI integration framework
- **React Hook Form** - Form handling and validation

### Backend
- **Express.js** - Web application framework
- **TypeScript** - Type safety for Node.js
- **MongoDB** - NoSQL database with Mongoose ODM
- **Google Gemini AI** - Advanced AI capabilities
- **JWT** - Secure authentication
- **Swagger** - API documentation

### DevOps & Tools
- **ESLint** - Code linting and formatting
- **Nodemon** - Development server auto-restart
- **ts-node** - TypeScript execution for Node.js

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Check the [Integration Guide](INTEGRATION_GUIDE.md) for setup help
- Review the [Backend Documentation](backend/README.md) for API details
- Open an issue for bug reports or feature requests

## 🌟 Acknowledgments

- Google Gemini AI for providing advanced AI capabilities
- Radix UI for accessible component primitives
- The open-source community for the amazing tools and libraries

---

**Built with 💚 for a sustainable future**
