import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateCorporateRequest } from '../models/create-corporate-request.model';
import { SearchCorporateForEventRequest } from '../models/corporate-search-request.model';
import { generic_response } from '../models/generic-response.model';
import { corporate } from '../models/corporate.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CorporateService {
  private apiUrl = environment.apiBaseUrl + 'Corporate';

  constructor(private http: HttpClient) {}

  createCorporate(request: CreateCorporateRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, request);
  }

  checkCorporateExists(corporateName: string, taxNumber: string): Observable<any> {
    const url = `${this.apiUrl}/CheckCorporateExists/${corporateName}/${taxNumber}`;
    return this.http.get<boolean>(url);
  }

  searchCorporateForEvent(request: SearchCorporateForEventRequest):Observable<generic_response<corporate[]>>{
    const url = `${this.apiUrl}/SearchCorporateForEvent`;
    
    return this.http.post<generic_response<corporate[]>>(url,request);
  }
}
