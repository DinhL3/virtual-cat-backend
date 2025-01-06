declare namespace Express {
  export interface Request {
    userId?: string;
    body: {
      username: string;
      password: string;
    };
  }
}
