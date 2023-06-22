import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = sessionStorage.getItem('JWT'); // Assuming JWT is stored in sessionStorage

    if (jwt) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log(cloned);

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
