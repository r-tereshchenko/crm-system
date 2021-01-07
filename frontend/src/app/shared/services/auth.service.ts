import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoginResponseToken, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private token: string | null = null;

  constructor(
    private http: HttpClient
  ) {}

  getToken(): string {
    return this.token
  }

  setToken(token: string | null): void {
    this.token = token
  }

  login(user: User): Observable<LoginResponseToken> {
    return this.http.post<LoginResponseToken>(`/api/auth/login`, user)
      .pipe(
        tap(({token}) => {
          localStorage.setItem('auth-token', token);
          this.setToken(token)
        })
      )
  }

  logout() {
    localStorage.clear();
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`/api/auth/register`, user)
  }
}
