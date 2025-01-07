import rateLimit from 'express-rate-limit';

export const actionRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 actions per minute
  message: 'Too many actions, please wait',
});
