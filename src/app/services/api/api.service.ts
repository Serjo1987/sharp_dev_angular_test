import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = 'http://193.124.114.46:3001/';

  constructor(private http: HttpClient) { }

  login(data: User): Observable<User> {
    return this.http.post<User>(this.BASE_URL + 'sessions/create', data, {});
  }

  register(data: User): Observable<User> {
    return this.http.post<User>(this.BASE_URL + 'users', data, {});
  }

  userInfo(): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders()
      .set('Authentication', 'bearer ' + localStorage.getItem('ACCESS_TOKEN'));

    return this.http.get<any>(this.BASE_URL + 'api/protected/user-info', {headers: headers});
  }
}