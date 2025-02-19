import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';

interface CustomJwtPayload {
  unique_name: string;
  family_name: string;
}


import { BehaviorSubject, Observable } from 'rxjs';
import { UserRegisterRequest } from '../models/user-register-request.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'access_token';
  private authState = new BehaviorSubject<any>(null);
  private apiUrl =  environment.apiBaseUrl + 'User';


  /**
   *
   */
  constructor(private http: HttpClient) {
    const token = this.getToken();
    if (token) {
      this.setAuthState(token);
      }
    
  }

  login(data: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/login`, data);
    }
  
    register(data: UserRegisterRequest): Observable<any> {
      return this.http.post(`${this.apiUrl}/register`, data);
    }
  
    googleLogin(data: any): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
    
      return this.http.post(`${this.apiUrl}/google-login`, JSON.stringify(data), { headers });
    }

  setAuthState(token: string) {
    const decodedToken = jwtDecode<CustomJwtPayload>(token);
    this.authState.next({ FirstName: decodedToken.unique_name, LastName: decodedToken.family_name, token });
  }

  getAuthState() {
    return this.authState.asObservable();
  }
  
  // Kullanıcının token'ını saklar
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Saklanan token'ı döner
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Kullanıcı oturumunu kontrol eder
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Kullanıcı oturumunu kapatır
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  decodeToken(token: string) {
    return jwtDecode(token);
  }

  

}
