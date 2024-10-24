import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { authResponse } from '../models/authResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // Inscription
  register(email: string, password: string): Observable<any> {
    return this.http.post<any>(environment.baseUrl+"/auth/register.php", { username: email, password: password }, environment.httpOption);
  }
  // Connexion
  login(username: string, password: string): Observable<authResponse> {
    return this.http.post<authResponse>(environment.baseUrl+"/auth/login", { username: username, password: password }, environment.httpOption);
  }
}
