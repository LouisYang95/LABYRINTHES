import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL API inscription
  private registerUrl = 'https://labyrinthes-production-2e07.up.railway.app/auth/register.php'; 

  // URL API login
  private loginUrl = 'https://labyrinthes-production-2e07.up.railway.app/auth/login';

  constructor(private http: HttpClient) { }

  // Inscription
  register(username: string, email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username: email, password };
    return this.http.post<any>(this.registerUrl, body, { headers });
  }

  // Connexion
  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };
    return this.http.post<any>(this.loginUrl, body, { headers });
  }
}
