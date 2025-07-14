# SustainaLink - Frontend & Backend Integration Guide

This guide explains how to connect your Next.js frontend with the Express.js backend and integrate Google Gemini AI.

## Architecture Overview

```
Frontend (Next.js)  ←→  Backend (Express.js)  ←→  MongoDB
      ↓                       ↓
   React Components     Google Gemini AI
      ↓
  API Calls (fetch/axios)
```

## Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Copy the example environment file and configure it:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```bash
# Database
MONGODB_URI=mongodb://localhost:27017/sustainalink
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sustainalink

# JWT Secret (generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Google Gemini AI API Key
GOOGLE_API_KEY=your_google_gemini_api_key_here

# CORS (add your frontend URL)
CORS_ORIGINS=http://localhost:3000,http://localhost:9002
```

### 4. Start MongoDB
Make sure MongoDB is running:
```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas cloud service
```

### 5. Start Backend Server
```bash
# Development mode
npm run dev

# The server will start on http://localhost:5000
```

### 6. Seed Sample Data (Optional)
```bash
npm run seed
```

## Frontend Integration

### 1. Install HTTP Client
In your main project directory:
```bash
npm install axios
# or
npm install swr
```

### 2. Create API Configuration
Create `src/lib/api.ts`:

```typescript
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 3. Create API Service Functions
Create `src/lib/apiServices.ts`:

```typescript
import api from './api';

// Authentication
export const authAPI = {
  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: string;
  }) => api.post('/auth/register', userData),

  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),

  logout: () => api.post('/auth/logout'),

  getMe: () => api.get('/auth/me'),

  updatePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.put('/auth/update-password', data),
};

// AI Services
export const aiAPI = {
  generateRecommendations: (data: {
    userProfile?: any;
    preferences?: string[];
    currentMetrics?: any;
  }) => api.post('/ai/recommendations', data),

  chatWithAI: (data: { message: string; history?: any[] }) =>
    api.post('/ai/chat', data),

  analyzeProduct: (productId: string) =>
    api.post('/ai/analyze-product', { productId }),

  generateESGReport: (data: { supplierId: string; timeframe?: string }) =>
    api.post('/ai/generate-esg-report', data),

  optimizeSupplyChain: (data: { supplyChainData: any; constraints?: any }) =>
    api.post('/ai/optimize-supply-chain', data),
};

// Products
export const productAPI = {
  getAll: (params?: { page?: number; limit?: number; category?: string }) =>
    api.get('/products', { params }),

  getById: (id: string) => api.get(`/products/${id}`),

  create: (productData: any) => api.post('/products', productData),

  update: (id: string, productData: any) => api.put(`/products/${id}`, productData),

  delete: (id: string) => api.delete(`/products/${id}`),
};

// Suppliers
export const supplierAPI = {
  getAll: (params?: { page?: number; limit?: number }) =>
    api.get('/suppliers', { params }),

  getById: (id: string) => api.get(`/suppliers/${id}`),

  create: (supplierData: any) => api.post('/suppliers', supplierData),

  update: (id: string, supplierData: any) => api.put(`/suppliers/${id}`, supplierData),
};

// ESG
export const esgAPI = {
  getMetrics: () => api.get('/esg/metrics'),
  generateReport: (data: any) => api.post('/esg/report', data),
};

// Rewards
export const rewardsAPI = {
  getUserRewards: () => api.get('/rewards'),
  getLeaderboard: () => api.get('/rewards/leaderboard'),
  claimReward: (rewardId: string) => api.post('/rewards/claim', { rewardId }),
};
```

### 4. Create Auth Context
Create `src/contexts/AuthContext.tsx`:

```typescript
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from '@/lib/apiServices';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  profile: any;
  esgMetrics: any;
  rewards: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateUser: (userData: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await authAPI.getMe();
        setUser(response.data.data);
      }
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (userData: any) => {
    try {
      const response = await authAPI.register(userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    authAPI.logout().catch(() => {}); // Call backend but don't wait
  };

  const updateUser = (userData: any) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 5. Update Layout to Include Auth Provider
Update `src/app/layout.tsx`:

```typescript
import { AuthProvider } from '@/contexts/AuthContext';
// ... other imports

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### 6. Update AI Chat Component
Update your `ChatAssistant` component to use the backend:

```typescript
'use client';

import { useState } from 'react';
import { aiAPI } from '@/lib/apiServices';
import { useAuth } from '@/contexts/AuthContext';

export function ChatAssistant() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const sendMessage = async () => {
    if (!input.trim() || !user) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await aiAPI.chatWithAI({
        message: input,
        history: messages,
      });

      const aiMessage = {
        role: 'assistant',
        content: response.data.data.response,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  // ... rest of component
}
```

### 7. Environment Variables
Add to your frontend `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Google Gemini AI Setup

### 1. Get API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your backend `.env` file as `GOOGLE_API_KEY`

### 2. Current AI Features
The backend provides these AI endpoints:

- **Chat Assistant**: `/api/ai/chat` - Interactive sustainability chat
- **Recommendations**: `/api/ai/recommendations` - Personalized sustainability recommendations
- **Product Analysis**: `/api/ai/analyze-product` - Analyze product sustainability
- **ESG Reports**: `/api/ai/generate-esg-report` - Generate comprehensive ESG reports
- **Supply Chain Optimization**: `/api/ai/optimize-supply-chain` - Optimize for sustainability

### 3. Usage Examples

```typescript
// Generate recommendations
const recommendations = await aiAPI.generateRecommendations({
  userProfile: user.profile,
  preferences: user.profile.preferences.sustainabilityGoals,
  currentMetrics: user.esgMetrics,
});

// Analyze a product
const analysis = await aiAPI.analyzeProduct('product-id');

// Generate ESG report
const report = await aiAPI.generateESGReport({
  supplierId: 'supplier-id',
  timeframe: 'quarterly',
});
```

## Database Schema

The backend includes these main models:

### User
- Authentication data
- Profile information
- ESG metrics
- Rewards and gamification data

### Product
- Product details
- Sustainability metrics
- Supply chain information
- ESG data

### Supplier
- Company information
- ESG scores
- Certifications
- Risk assessment

### Reward
- Gamification rewards
- Badges, NFTs, discounts
- Requirements and values

### ESGReport
- Comprehensive ESG reporting
- Environmental, social, governance metrics
- Risk assessment and targets

## API Documentation

Once the backend is running, visit:
- Swagger UI: `http://localhost:5000/api-docs`
- Health Check: `http://localhost:5000/health`

## Testing the Integration

### 1. Start Backend
```bash
cd backend
npm run dev
```

### 2. Start Frontend
```bash
npm run dev
```

### 3. Test Authentication
1. Register a new account
2. Login with credentials
3. Access protected routes

### 4. Test AI Features
1. Use the chat assistant
2. Generate sustainability recommendations
3. Analyze products

## Deployment

### Backend Deployment
1. Set environment variables in production
2. Use a strong JWT secret
3. Configure MongoDB Atlas for production database
4. Set up proper CORS origins

### Environment Variables for Production
```bash
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=very_strong_secret_key
GOOGLE_API_KEY=your_production_api_key
CORS_ORIGINS=https://your-domain.com
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure CORS_ORIGINS includes your frontend URL
2. **Authentication Issues**: Check JWT_SECRET and token storage
3. **Database Connection**: Verify MongoDB URI and network access
4. **AI API Errors**: Validate Google API key and request format

### Debug Steps

1. Check backend logs for errors
2. Verify environment variables
3. Test API endpoints with Postman/curl
4. Check browser network tab for failed requests

## Additional Features

The backend is ready for:
- File uploads (Cloudinary integration)
- Email notifications
- Real-time features (Socket.io can be added)
- Advanced analytics
- Third-party integrations

This comprehensive backend provides all the functionality needed for your SustainaLink platform with AI-powered sustainability features!
