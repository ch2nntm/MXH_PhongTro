import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthserviceService } from '../auth/authservice.service';
import { TokenStoreService } from '../token-store/token-store.service';

@Injectable({
  providedIn: 'root'
})
export class ManagePostService {
  private apiUrl='http://localhost:5000/api/admin/management-user';
  constructor(private http: HttpClient, private token: TokenStoreService) { }

  getPost(): Observable<any>{
    const token = this.token.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
     console.log(headers)
    return this.http.get(this.apiUrl);

    return this.http.get(`${this.apiUrl}` , {headers}).pipe(
      map((res) => {
        return res;
      })
    );
  }
  getPost1(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}`);
  }

}
