import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_ENDPOINTS, TOKEN_KEY, USER_KEY } from '../config/api.config';
import { LoginRequest, SignupRequest, JwtResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials).pipe(
      tap((response: JwtResponse) => {
        this.saveToken(response.token);
        this.saveUser(response);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  register(userData: SignupRequest): Observable<any> {
    return this.http.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.isAuthenticatedSubject.next(false);
  }

  saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  saveUser(user: any): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }
}
