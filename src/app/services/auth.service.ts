import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(loginForm: any) {
    return this.http.post(
      'http://localhost:8080/ShopmeAdmin/auth/login',
      loginForm
    );
  }
}
