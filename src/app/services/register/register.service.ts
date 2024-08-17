import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { ApiService } from '../api/api.service';
import { TokenStoreService } from '../token-store/token-store.service';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  private userSubject : BehaviorSubject<any>;
  public user : Observable<any>;

  constructor (private _api: ApiService, private _token: TokenStoreService ) {
    this.userSubject = new BehaviorSubject<any>(this._token.getUser());
    this.user = this.userSubject.asObservable();
  }

  register(credential: any): Observable<any> {
    return this._api.postTypeRequest('register', {
      email: credential.email,
      password: credential.password,
      name: credential.name,
      phone: credential.phone,
      address: credential.address
    }).pipe(
      map((response: any) => {
        console.log('API Response:', response); // Kiểm tra phản hồi từ API
        if (response && response.token && response.user) {
          const actor = response.user; // Lấy thông tin người dùng từ phản hồi
          if (actor.roles === 'user' || actor.roles === 'admin') {
            this._token.setToken(response.token);
            this._token.setUser(actor);
            this.userSubject.next(actor);
            return actor;
          } else {
            throw new Error('Vai trò người dùng không hợp lệ');
          }
        } else {
          throw new Error('Thông tin đăng ký không hợp lệ');
        }
      }),
      catchError(error => {
        console.error('Registration Error:', error);
        return throwError(error);
      })
    );
  }
  
  
  
}
