// src/app/cards/cards.component.ts
import { Component, OnInit } from '@angular/core';
import { Card, CardService } from '../card.service';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, SearchComponent],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  cards: Card[] = [];
  filteredCards: Card[] = [];
  searchQuery: string = '';

  constructor(private cardService: CardService) { }

  ngOnInit() {
    this.cardService.getCards().subscribe({
      next: (cards) => {
        this.cards = cards;
        this.filteredCards = cards;
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

  getBackgroundColor(type: number): string {
    const colors: { [key: number]: string } = {
      1: '#BC2C1A', 
      2: '#134611', 
      3: '#D81159'  
    };
    return colors[type] || '#f9f9f9'; 
  }

  onSearchChange(searchValue: string): void {
    this.searchQuery = searchValue;
    this.filteredCards = this.cards.filter(card => 
      card.title.toLowerCase().includes(searchValue.toLowerCase()) || 
      card.description.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  removeCard(index: number): void {
    this.cards.splice(index, 1);
    this.onSearchChange(this.searchQuery); 
  }

}
