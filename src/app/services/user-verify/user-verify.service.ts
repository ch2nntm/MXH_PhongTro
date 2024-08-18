import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStoreService } from '../token-store/token-store.service';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserVerifyService {
  private apiUrl='http://localhost:5000/api/admin/management-verify';
  constructor(private _api: ApiService, private token: TokenStoreService) { }

  Call_Token(): Observable<any>{
    const token = this.token.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this._api.API_Basic_GetTypeRequest(this.apiUrl);
  }

  Call_API_ManageUserID(params: any): Observable<any>{
    return this._api.API_Basic_GetTypeRequestParams(this.apiUrl, params);
  }

  Call_API_ManageUser(): Observable<any>{
    return this._api.API_Basic_GetTypeRequest(`${this.apiUrl}`);
  }
}
