import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../expense.service';
import { MerchantService } from '../merchant.service';
import { CardService } from '../card.service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './expense-tracker.component.html',
    styleUrls: ['./expense-tracker.component.css'],// Add a custom stylesheet for mobile styles
})
export class ExpenseComponent  implements OnInit {
    expenses: any[] = [];
    merchants: any[] = [];
    cards: any[] = [];
    expense: any = {
        merchantId: null,
        cardId: null,
        transactionDate: this.getTodayDate(), // Default to today's date
        price: null,
        isSplit: false,
        splitMonths: null,
        willRefund: false
    };
    editMode = false;

    constructor(
        private expenseService: ExpenseService,
        private merchantService: MerchantService,
        private cardService: CardService
    ) {}

    ngOnInit(): void {
        this.loadMerchants();
        this.loadCards();

        // Subscribe to expenses$ for real-time updates
        this.expenseService.expenses$.subscribe((data) => {
            console.log('Updated expenses:', data);
            this.expenses = data;
        });

        // Load initial expenses
        this.expenseService.loadExpenses();
    }

    getTodayDate(): string {
        const today = new Date();
        return today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    }

    loadMerchants() {
        this.merchantService.getMerchants().subscribe((data) => {
            this.merchants = data;
        });
    }

    loadCards() {
        this.cardService.getCards().subscribe((data) => {
            this.cards = data;
        });
    }

    addExpense(expenseForm: NgForm) {
        this.expenseService.addExpense(this.expense).subscribe(
            (response: any) => {
                console.log(response.message); // Log the success message
                this.expenses.push({ ...this.expense, id: response.id }); // Add the new expense with its ID
                expenseForm.resetForm();
                this.resetExpense();
            },
            (error) => {
                console.error('Error adding expense:', error);
            }
        );
    }

    deleteExpense(id: number) {
        this.expenseService.deleteExpense(id).subscribe(
            (response: any) => {
                console.log(response.message); // Log the success message
                this.expenses = this.expenses.filter((expense) => expense.id !== id); // Remove the expense from the list
            },
            (error) => {
                console.error('Error deleting expense:', error);
            }
        );
    }

    editExpense(expense: any) {
        this.expense = { ...expense };
        this.editMode = true;
    }

    updateExpense(expenseForm: NgForm) {
        if (this.expense.id) {
            this.expenseService.updateExpense(this.expense.id, this.expense).subscribe(() => {
                console.log('Expense updated successfully');
                expenseForm.resetForm();
                this.resetExpense();
            });
        }
    }

    resetExpense() {
        this.expense = {
            merchantId: null,
            cardId: null,
            transactionDate: '',
            price: null,
            isSplit: false,
            splitMonths: null,
        };
        this.editMode = false;
    }
}
