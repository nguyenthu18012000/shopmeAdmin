import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(loginForm: any) {
    return this.http.post('ShopmeAdmin/auth/login', loginForm);
  }
}
