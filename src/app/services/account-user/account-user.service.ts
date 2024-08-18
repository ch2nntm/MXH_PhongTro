import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStoreService } from '../token-store/token-store.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountUserService {
  private apiUrl='http://localhost:5000/api/my-content';
  constructor(private http: HttpClient, private token: TokenStoreService) { }

  Call_API_GetPost(): Observable<any>{
    const token = this.token.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
     console.log(headers)
    return this.http.get(this.apiUrl);
  }
}
