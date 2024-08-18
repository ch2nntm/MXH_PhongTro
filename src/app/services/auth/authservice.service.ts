import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { TokenStoreService } from '../token-store/token-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  // private tokenKey = 'authToken';
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;
  
  constructor(private _api: ApiService, private _token: TokenStoreService) {
    //lưu trữ giá trị hiện tại và phát giá trị này ngay lập tức cho bất kỳ observer mới nào đăng ký (subscribe) với nó
    this.userSubject = new BehaviorSubject<any>(this._token.getUser());
    this.user = this.userSubject.asObservable();// Chỉ đổi từ BehaviorSubject thành Observable
  }

  getUser() {
    console.log(this.userSubject);
    console.log(this.userSubject.value);
    return this.userSubject.value;
  }

  Call_API_LoginUser(credential: any): Observable<any> {
    return this._api.API_Basic_PostTypeRequest('login', {
      email: credential.email,
      password: credential.password
    }).pipe(
      map((response: any) => {
        if (response && response.token && response.user) {
          console.log('Token:', response.token);
          const actor = response.user;
          if (actor.roles === 'user' || actor.roles === 'admin') {
            this._token.setToken(response.token);
            console.log('Token stored:', this._token.getToken());
            this._token.setUser(actor);
            this.userSubject.next(actor);
            return actor;
          } else {
            throw new Error('Vai trò người dùng không hợp lệ');
          }
        } else {
          throw new Error('Thông tin đăng nhập không hợp lệ');
        }
      })
    );
  }

  Call_API_RegisterUser(requestBody: any): Observable<any> {
    return this._api.API_Basic_PostTypeRequest('register', requestBody);
  }

  logout() {
    this._token.clearStorage();
    this.userSubject.next(null);
  }
}
