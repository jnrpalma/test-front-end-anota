// src/app/cards/cards.component.ts
import { Component, OnInit } from '@angular/core';
import { Card, CardService } from '../card.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  cards: Card[] = [];

  constructor(private cardService: CardService) { }

  ngOnInit() {
    this.cardService.getCards().subscribe({
      next: (cards) => {
        console.log('Cards received:', cards);
        this.cards = cards;
      },
      error: (error) => console.error('Error fetching cards:', error)
    });
  }

  getType(type: number): string {
    const types: { [key: number]: string } = {
      1: 'Paisagem',
      2: 'Flor',
      3: 'Pizza'
    };
    return types[type] || 'Desconhecido';
  }

  removeCard(index: number): void {
    this.cards.splice(index, 1); // Remove o cartão pelo índice
  }
}
