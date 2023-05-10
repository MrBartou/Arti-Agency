import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  function: string;
  avatar: string;
  velocity: string;
  id_project: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'assets/db/users.json';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${id}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.usersUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.usersUrl}/${id}`);
  }

  login(email: string, password: string): Observable<User | undefined> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        map(users => users.find(user => user.email === email && user.password === password))
      );
  }
}
