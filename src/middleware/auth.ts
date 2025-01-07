import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  userId?: string;
}

export const auth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ message: 'No token, authorization denied' });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'fallback-secret',
    );
    req.userId = (decoded as any).userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
