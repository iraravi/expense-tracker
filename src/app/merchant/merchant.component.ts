import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MerchantService } from '../merchant.service';

@Component({
  selector: 'app-merchant',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './merchant.component.html',
})
export class MerchantComponent implements OnInit {
  merchants: any[] = [];
  merchant = { name: '' };
  editMode = false;
  currentMerchantId: number | null = null;

  constructor(private merchantService: MerchantService) {}

  ngOnInit(): void {
    this.loadMerchants();
  }

  loadMerchants() {
    this.merchantService.getMerchants().subscribe((data) => {
      this.merchants = data;
    });
  }

  addMerchant() {
    this.merchantService.addMerchant(this.merchant).subscribe(() => {
      this.loadMerchants();
      this.resetForm();
    });
  }

  editMerchant(merchant: any) {
    this.editMode = true;
    this.currentMerchantId = merchant.id;
    this.merchant = { name: merchant.name };
  }

  updateMerchant() {
    if (this.currentMerchantId !== null) {
      this.merchantService.updateMerchant(this.currentMerchantId, this.merchant).subscribe(() => {
        this.loadMerchants();
        this.resetForm();
      });
    }
  }

  deleteMerchant(id: number) {
    this.merchantService.deleteMerchant(id).subscribe(() => {
      this.loadMerchants();
    });
  }

  resetForm() {
    this.editMode = false;
    this.currentMerchantId = null;
    this.merchant = { name: '' };
  }
}
