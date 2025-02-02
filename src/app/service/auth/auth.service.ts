import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/auth';
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      map((response: any) => {
        if (response && response.access_token) {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);
          this.getProfile().subscribe();
        }
        return response;
      })
    );
  }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('access_token');
    if (!token) return new Observable();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.apiUrl}/profile`, { headers }).pipe(
      map((user) => {
        this.userSubject.next(user);
        return user;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
