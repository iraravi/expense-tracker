import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule
import { CardService } from '../card.service';

@Component({
  selector: 'app-card',
  standalone: true, // Mark as standalone component
  imports: [FormsModule, CommonModule], // Import FormsModule and CommonModule
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  cards: any[] = [];
  card = { cardName: '', holderName: '' };
  editMode = false;
  currentCardId: number | null = null;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards() {
    this.cardService.getCards().subscribe((data) => {
      this.cards = data;
    });
  }

  addCard() {
    this.cardService.addCard(this.card).subscribe(() => {
      this.loadCards();
      this.resetForm();
    });
  }

  editCard(card: any) {
    this.editMode = true;
    this.currentCardId = card.id;
    this.card = { cardName: card.cardName, holderName: card.holderName };
  }

  updateCard() {
    if (this.currentCardId !== null) {
      this.cardService.updateCard(this.currentCardId, this.card).subscribe(() => {
        this.loadCards();
        this.resetForm();
      });
    }
  }

  deleteCard(id: number) {
    this.cardService.deleteCard(id).subscribe(() => {
      this.loadCards();
    });
  }

  resetForm() {
    this.editMode = false;
    this.currentCardId = null;
    this.card = { cardName: '', holderName: '' };
  }
}
