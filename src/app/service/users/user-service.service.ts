import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../model/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private apiHost = 'https://api.escuelajs.co/api/v1';
  private _item!: User;
  private _items!: Array<User>;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.apiHost}/users`);
  }
  createUser(): Observable<User> {
    return this.http.post<User>(`${this.apiHost}/users/`, this.item);
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiHost}/users/` + user.id, this.item);
  }

  get item(): User {
    if (this._item == null) {
      this._item = new User();
    }
    return this._item;
  }

  set item(value: User) {
    this._item = value;
  }

  get items(): Array<User> {
    if (this._items == null) {
      this._items = new Array<User>();
    }
    return this._items;
  }

  set items(value: Array<User>) {
    this._items = value;
  }
}
