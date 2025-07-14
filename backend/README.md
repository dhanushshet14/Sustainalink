# SustainaLink Backend

A comprehensive backend API for the SustainaLink sustainability platform, built with Express.js, MongoDB, and Google Gemini AI.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **AI-Powered Insights**: Google Gemini AI integration for sustainability recommendations
- **ESG Metrics**: Comprehensive Environmental, Social, and Governance tracking
- **Supply Chain Management**: Transparent supplier and product tracking
- **Gamification**: Rewards, leaderboards, and sustainability scoring
- **Real-time Analytics**: Dashboard metrics and reporting

## Tech Stack

- **Backend Framework**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **AI Integration**: Google Gemini AI for recommendations and analysis
- **Authentication**: JWT tokens with bcrypt password hashing
- **API Documentation**: Swagger/OpenAPI 3.0
- **Security**: Helmet, CORS, Rate limiting
- **Validation**: Express-validator and Joi

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # MongoDB connection
│   ├── controllers/
│   │   ├── auth.ts              # Authentication controllers
│   │   └── ai.ts                # AI-powered features
│   ├── middleware/
│   │   ├── auth.ts              # Authentication middleware
│   │   ├── errorHandler.ts     # Global error handling
│   │   └── notFound.ts          # 404 handler
│   ├── models/
│   │   ├── User.ts              # User model
│   │   ├── Product.ts           # Product model
│   │   └── Supplier.ts          # Supplier model
│   ├── routes/
│   │   ├── auth.ts              # Authentication routes
│   │   ├── ai.ts                # AI routes
│   │   ├── products.ts          # Product routes
│   │   ├── suppliers.ts         # Supplier routes
│   │   ├── esg.ts               # ESG metrics routes
│   │   └── rewards.ts           # Gamification routes
│   ├── utils/
│   │   ├── helpers.ts           # Utility functions
│   │   ├── validation.ts        # Validation schemas
│   │   └── emailService.ts      # Email notifications
│   └── server.ts                # Main server file
├── package.json
├── tsconfig.json
└── .env.example
```

## Setup Instructions

### 1. Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Google AI API key (for Gemini)

### 2. Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

### 3. Environment Configuration

Edit the `.env` file with your configuration:

```bash
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/sustainalink
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sustainalink

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Google Gemini AI
GOOGLE_API_KEY=your_google_gemini_api_key_here

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:9002
```

### 4. Database Setup

Make sure MongoDB is running:

```bash
# For local MongoDB
mongod

# The application will automatically connect to the database
```

### 5. Start the Server

```bash
# Development mode with hot reload
npm run dev

# Production build
npm run build
npm start
```

The server will start on `http://localhost:5000`

## API Documentation

Once the server is running, you can access the API documentation at:
- Swagger UI: `http://localhost:5000/api-docs`
- Health Check: `http://localhost:5000/health`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/forgot-password` - Request password reset
- `PUT /api/auth/reset-password/:token` - Reset password
- `PUT /api/auth/update-password` - Update password

### AI Features
- `POST /api/ai/recommendations` - Generate sustainability recommendations
- `POST /api/ai/chat` - Chat with AI assistant
- `POST /api/ai/analyze-product` - Analyze product sustainability
- `POST /api/ai/generate-esg-report` - Generate ESG reports
- `POST /api/ai/optimize-supply-chain` - Optimize supply chain

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Suppliers
- `GET /api/suppliers` - Get all suppliers
- `POST /api/suppliers` - Create new supplier
- `GET /api/suppliers/:id` - Get supplier by ID
- `PUT /api/suppliers/:id` - Update supplier

### ESG Metrics
- `GET /api/esg/metrics` - Get ESG metrics
- `POST /api/esg/report` - Generate ESG report

### Rewards & Gamification
- `GET /api/rewards` - Get user rewards
- `GET /api/rewards/leaderboard` - Get leaderboard
- `POST /api/rewards/claim` - Claim reward

## Key Features

### 1. AI-Powered Sustainability Recommendations
- Personalized recommendations based on user profile and current metrics
- Analysis of product sustainability scores
- Supply chain optimization suggestions
- ESG report generation with insights

### 2. Comprehensive ESG Tracking
- Environmental metrics (carbon footprint, water usage, waste management)
- Social metrics (employee safety, labor practices, community engagement)
- Governance metrics (business ethics, transparency, compliance)

### 3. Supply Chain Transparency
- Complete product journey tracking
- Supplier verification and scoring
- Transportation mode impact analysis
- Certification tracking

### 4. Gamification System
- Point-based reward system
- User levels and badges
- Leaderboards for sustainability achievements
- NFT showcases for environmental milestones

### 5. Security Features
- JWT-based authentication
- Role-based access control (consumer, supplier, admin)
- Rate limiting to prevent abuse
- Input validation and sanitization
- CORS protection

## Development

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
npm run lint:fix
```

### Type Checking
```bash
npm run typecheck
```

## Deployment

### Environment Variables for Production
Make sure to set these in your production environment:
- `NODE_ENV=production`
- Strong `JWT_SECRET`
- Production MongoDB URI
- Valid Google AI API key
- Email service credentials (if using)

### Docker Deployment (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 5000
CMD ["node", "dist/server.js"]
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please contact the SustainaLink development team.
