/**
 * Validation schemas for request data
 */

export const authValidation = {
  register: {
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'Please provide a valid email',
    },
    password: {
      isLength: { min: 6 },
      errorMessage: 'Password must be at least 6 characters long',
    },
    firstName: {
      trim: true,
      isLength: { min: 1, max: 50 },
      errorMessage: 'First name is required and must be less than 50 characters',
    },
    lastName: {
      trim: true,
      isLength: { min: 1, max: 50 },
      errorMessage: 'Last name is required and must be less than 50 characters',
    },
  },
  login: {
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'Please provide a valid email',
    },
    password: {
      exists: true,
      errorMessage: 'Password is required',
    },
  },
};

export const productValidation = {
  create: {
    name: {
      trim: true,
      isLength: { min: 1, max: 200 },
      errorMessage: 'Product name is required and must be less than 200 characters',
    },
    description: {
      trim: true,
      isLength: { min: 1, max: 2000 },
      errorMessage: 'Description is required and must be less than 2000 characters',
    },
    category: {
      isIn: [['food', 'clothing', 'electronics', 'home', 'beauty', 'automotive', 'industrial', 'other']],
      errorMessage: 'Please select a valid category',
    },
    brand: {
      trim: true,
      isLength: { min: 1 },
      errorMessage: 'Brand is required',
    },
  },
};

export const supplierValidation = {
  create: {
    companyName: {
      trim: true,
      isLength: { min: 1, max: 200 },
      errorMessage: 'Company name is required and must be less than 200 characters',
    },
    'contactInfo.email': {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'Please provide a valid email',
    },
    'contactInfo.phone': {
      isMobilePhone: 'any',
      errorMessage: 'Please provide a valid phone number',
    },
  },
};
