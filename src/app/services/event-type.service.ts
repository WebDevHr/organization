import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/result.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventTypeService {
  private apiUrl = environment.apiBaseUrl + 'EventType';

  constructor(private http: HttpClient) { }

  getEventTypes(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }
}