import rateLimit from 'express-rate-limit';

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// For resource-intensive gameplay operations
export const resourceIntensiveRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: isDevelopment ? 30 : 5, // 30 in dev, 5 in production
  message: 'Too many resource-intensive actions, please wait',
});

// For lightweight UI/menu operations
export const standardRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: isDevelopment ? 100 : 15, // 100 in dev, 15 in production
  message: 'Too many requests, please wait',
});

// For authentication (stricter)
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDevelopment ? 30 : 5, // 30 in dev, 5 in production
  message: 'Too many authentication attempts, please try again later',
});

// For API-wide basic protection (very lenient)
export const globalRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: isDevelopment ? 300 : 60, // 300 in dev, 60 in production
  message: 'Too many requests, please wait',
});
