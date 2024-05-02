import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  
  @Output() filterChange = new EventEmitter<string>();

  constructor() {}

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value; 
    this.filterChange.emit(value);
  }
}

