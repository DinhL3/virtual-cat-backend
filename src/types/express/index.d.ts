import * as express from 'express';

declare global {
  namespace Express {
    // Add our custom property to the Request interface
    interface Request {
      userId?: string;
    }
  }
}

// This export is needed to convert this file into a module
export {};
