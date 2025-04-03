import rateLimit from 'express-rate-limit';

// For resource-intensive gameplay operations
export const resourceIntensiveRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 actions per minute
  message: 'Too many resource-intensive actions, please wait',
});

// For lightweight UI/menu operations
export const standardRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 15, // 15 actions per minute
  message: 'Too many requests, please wait',
});

// For authentication (stricter)
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per 15 minutes
  message: 'Too many authentication attempts, please try again later',
});

// For API-wide basic protection (very lenient)
export const globalRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute
  message: 'Too many requests, please wait',
});
