export interface Contact {
  id?: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  description?: string;
  profilePic?: string;
  favorite?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContactRequest {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  description?: string;
  profilePic?: string;
  favorite?: boolean;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
