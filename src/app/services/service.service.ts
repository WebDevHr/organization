import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/result.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = environment.apiBaseUrl + 'Service';

  constructor(private http: HttpClient) { }

  getServices(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }
}