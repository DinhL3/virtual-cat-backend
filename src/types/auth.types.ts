export interface UserResponse {
  id: string;
  username: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: UserResponse;
}

export interface ErrorResponse {
  message: string;
  error?: any;
}
