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

  login(credentials: any): Observable<any> {
    return this._api.postTypeRequest('login', {
      email: credentials.email,
      password: credentials.password
    }).pipe(
      map((response: any) => {
        // let user={
        //   email: credentials.email,
        //   token: response.token,
        //   role: response.role
        // };
        // this._token.setToken(response.token);
        // this._token.setUser(response.data[0]);
        // this.userSubject.next(user);
        // return user;
        if (response && response.token && response.user) {
          const actor = response.user;
          // if (actor.roles === 'user' || actor.roles === 'admin') {
            this._token.setToken(response.token);
            // sessionStorage.setItem(this.tokenKey, response.token);
            this._token.setUser(actor);
            this.userSubject.next(actor);
            return actor;
        //  } else {
        //     throw new Error('Vai trò người dùng không hợp lệ');
        //   }
        } else {
          throw new Error('Thông tin đăng nhập không hợp lệ');
        }
      })
    );
  }

  register(user: any): Observable<any> {
    return this._api.postTypeRequest('register', {
      fullName: user.fullName,
      email: user.email,
      password: user.password,
    });
  }

  logout() {
    this._token.clearStorage();
    this.userSubject.next(null);
  }
}
