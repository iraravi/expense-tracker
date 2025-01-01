import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private apiUrl = 'https://eapi.kiring.in/api/expenses';
  // BehaviorSubject to store the latest expenses state
  private expensesSubject = new BehaviorSubject<any[]>([]);
  expenses$ = this.expensesSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Fetch expenses from the backend and update the BehaviorSubject
  loadExpenses() {
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      this.expensesSubject.next(data);
    });
  }

  addExpense(expense: any) {
    return this.http.post(this.apiUrl, expense).pipe(
      tap(() => {
        this.loadExpenses(); // Refresh expenses after adding
      })
    );
  }

  deleteExpense(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.loadExpenses(); // Refresh expenses after deleting
      })
    );
  }

  updateExpense(id: number, expense: any) {
    return this.http.put(`${this.apiUrl}/${id}`, expense).pipe(
      tap(() => {
        this.loadExpenses(); // Refresh expenses after updating
      })
    );
  }
}
