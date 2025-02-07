import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private apiUrl = 'http://127.0.0.1:8000/api/auth';

  constructor(private http: HttpClient, private globalService: GlobalService) {}

  // servicio Login JWT
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // Servicio Registro JWT
  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password });
  }

  //Servicio Logout JWT
  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) return new Observable(); // Si no hay token, no hace la petición

    const headers = new HttpHeaders({
      'Authorization': this.globalService.jwtToken
    });

    return this.http.post(`${this.apiUrl}/logout`, {}, { headers });
  }
}
