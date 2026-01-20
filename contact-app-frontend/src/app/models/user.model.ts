export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  about?: string;
  profilePic?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  about?: string;
}

export interface JwtResponse {
  token: string;
  type: string;
  id: number;
  name: string;
  email: string;
}

export interface UserUpdateRequest {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  about?: string;
  profilePic?: string;
}
