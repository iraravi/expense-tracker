import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private apiUrl = 'https://eapi.kiring.in/api/cards';

  constructor(private http: HttpClient) {}

  getCards(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addCard(card: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, card);
  }

  deleteCard(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateCard(id: number, card: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, card);
  }
}
