import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getListUser() {
    return this.http.get('ShopmeAdmin/users', {});
  }

  getListUserRole() {
    return this.http.get('ShopmeAdmin/users/roles', {});
  }

  createUser(newUser: any) {
    return this.http.post('ShopmeAdmin/users/new', newUser, {
      responseType: 'text',
    });
  }

  getUserById(id: number) {
    return this.http.get(`ShopmeAdmin/users/${id}`);
  }

  editUser(user: any) {
    return this.http.put('ShopmeAdmin/users/edit', user, {
      responseType: 'text',
    });
  }

  deleteUser(id: number) {
    return this.http.delete(`ShopmeAdmin/users/delete/${id}`, {
      responseType: 'text',
    });
  }
}
