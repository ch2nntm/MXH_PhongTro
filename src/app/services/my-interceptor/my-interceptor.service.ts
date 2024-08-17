import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { TokenStoreService } from '../token-store/token-store.service';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization'; // It's common to use 'Authorization' for the token header

@Injectable() //Hàm đặt lại
export class MyInterceptor implements HttpInterceptor {
  constructor(private _token: TokenStoreService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this._token.getToken();
    if (token) {
      authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`),
      });
    }
    // console.log("Authreq: "+authReq.headers.getAll);
    return next.handle(authReq);
  }
}

// export const authInterceptorProviders = [
//   { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true },
// ];
