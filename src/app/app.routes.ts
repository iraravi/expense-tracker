import { Routes } from '@angular/router';
import { CardComponent } from './card/card.component';
import { MerchantComponent } from './merchant/merchant.component';
import {ExpenseComponent} from './expense-tracker/expense-tracker.component';

export const routes: Routes = [
    { path: 'cards', component: CardComponent },
    { path: 'merchants', component: MerchantComponent },
    { path: 'expense', component: ExpenseComponent },
    { path: '', redirectTo: 'cards', pathMatch: 'full' }, // Default route
];
