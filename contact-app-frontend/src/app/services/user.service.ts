import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../config/api.config';
import { User, UserUpdateRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(API_ENDPOINTS.USER.ME);
  }

  updateUser(userData: UserUpdateRequest): Observable<User> {
    return this.http.put<User>(API_ENDPOINTS.USER.ME, userData);
  }
}
