import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authS: AuthService,
    private router: Router
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authS.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: this.authS.getToken()
        }
      })
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error)
      })
    )
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401) {
      const extras: {queryParams?: { sessionExpired: boolean }} = {}

      if (localStorage.getItem('auth-token')) {
        extras['queryParams'] = {
            sessionExpired: true
          }
      }

      this.router.navigate(['/login'], extras)
    }

    return throwError(error)
  }
}
