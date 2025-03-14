import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  login(dto: any): Observable<any> {
    return this.http.post(
      `http://localhost:3000/auth/login`,
      dto
    );
  }

  create(dto: any): Observable<any> {
    return this.http.post(
      `http://localhost:3000/users/create`,
      dto
    );
  }
}
