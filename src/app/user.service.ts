import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uri = 'http://localhost:4000';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  register(user: User) {
    return this.http.post(`${this.uri}/api/users/register`, user);
  }




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
    return this.http.post(`${this.uri}/api/users/register`, user);
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
