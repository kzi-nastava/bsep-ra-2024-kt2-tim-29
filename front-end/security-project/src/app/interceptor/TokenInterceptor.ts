import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent
} from '@angular/common/http';
import { AuthService } from '../service/auth.service';

import { Observable} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.auth.tokenIsPresent() && !this.isIgnoredEndpoint(request)) {
      const token = this.auth.getToken();
      console.log('PROVERA TOKENA:', token);  
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}` 
        }
      });
    }
    return next.handle(request);
  }

  private isIgnoredEndpoint(request: HttpRequest<any>): boolean {
    const ignoredEndpoints = ['/refresh-token', '/check-token'];
    return ignoredEndpoints.some(endpoint => request.url.includes(endpoint));
  }
}
