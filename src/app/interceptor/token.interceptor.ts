import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      url: `https://api.apilayer.com/currency_data/`  + req.url,
      setHeaders: { apikey: environment.API_URL },
    });
    return next.handle(req).pipe(
      catchError(err => {
        return throwError(err);
      }
      )
    );
  }
}