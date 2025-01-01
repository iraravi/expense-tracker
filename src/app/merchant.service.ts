import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  private apiUrl = 'https://eapi.kiring.in/api/merchants';

  constructor(private http: HttpClient) {}

  getMerchants(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addMerchant(merchant: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, merchant);
  }

  deleteMerchant(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateMerchant(id: number, merchant: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, merchant);
  }
}
