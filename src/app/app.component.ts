import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { Component } from '@angular/core';
import { CardsComponent } from './cards/cards.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ HttpClientModule,RouterOutlet, HeaderComponent, SearchComponent, CardsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Corrigido styleUrl para styleUrls
})
export class AppComponent {
}
