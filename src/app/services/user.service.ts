import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getListUser() {
    return this.http.get('http://localhost:8080/ShopmeAdmin/users', {});
  }

  getListUserRole() {
    return this.http.get('http://localhost:8080/ShopmeAdmin/users/roles', {});
  }

  createUser(newUser: any) {
    return this.http.post(
      'http://localhost:8080/ShopmeAdmin/users/new',
      newUser,
      { responseType: 'text' }
    );
  }

  getUserById(id: number) {
    return this.http.get(`http://localhost:8080/ShopmeAdmin/users/${id}`);
  }

  editUser(user: any) {
    return this.http.put('http://localhost:8080/ShopmeAdmin/users/edit', user, {
      responseType: 'text',
    });
  }

  deleteUser(id: number) {
    return this.http.delete(
      `http://localhost:8080/ShopmeAdmin/users/delete/${id}`,
      {
        responseType: 'text',
      }
    );
  }
}
