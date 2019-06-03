import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.uri}/users`);
  }

  getUserbyId(id) {
    return this.http.get(`${this.uri}/users/${id}`);
  }

  addUser(name, surname, email, password, isActivated, cellNo) {
    const user = {
      name,
      surname,
      email,
      password,
      isActivated,
      cellNo
    };
    JSON.stringify(user);
    return this.http.post(`${this.uri}/users/add`, user);
  }

  updateUser(id, name, surname, email, password, cellNo) {
    const user = {
      name,
      surname,
      email,
      password,
      cellNo
    };
    return this.http.post(`${this.uri}/users/update/${id}`, user);
  }

  deleteUser(id) {
    return this.http.get(`${this.uri}/users/delete/${id}`);
  }
}
