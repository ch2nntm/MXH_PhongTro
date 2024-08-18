import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { ApiService } from '../api/api.service';
import { TokenStoreService } from '../token-store/token-store.service';
import { Post } from '../../models/post/post';

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  private userSubject : BehaviorSubject<any>;
  public user : Observable<any>;

  constructor (private _api: ApiService, private _token: TokenStoreService) {
    this.userSubject = new BehaviorSubject<any>(this._token.getUser());
    this.user = this.userSubject.asObservable();
  }
  public url = this._api;
  Call_API_ListPost(requestBody: any): Observable<any> {
    return this._api.API_Basic_PostTypeRequest('home', requestBody);
  }

  Call_API_Search_Post(params: any): Observable<any>{
    return this._api.API_Basic_PostTypeRequest('home?'+params,params).pipe(
      map(response => response || throwError('Không tìm thấy kết quả phù hợp')),
      catchError(error => {
        console.error('Error in SearchPost:', error);
        return throwError(error);
      })
    );
  }

  
  Call_API_Admin_Management(params: any): Observable<any>{
    return this._api.API_Basic_GetTypeRequest('admin/management-user').pipe(
      map(response => response || throwError('Không tìm thấy kết quả phù hợp')),
      catchError(error => {
        console.error('Error in SearchPost:', error);
        return throwError(error);
      })
    );
  }

  DetailPost(param: any){
    return this._api.API_Basic_GetTypeRequest(`home/${param}`);
  }

}

//Call_API_