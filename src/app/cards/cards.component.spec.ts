import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardsComponent } from './cards.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import para teste com HttpClient

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CardsComponent,
        HttpClientTestingModule 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    component.cards = [
      { id: 1, title: 'Árvore', description: 'Uma grande árvore', img: '', type: 1 },
      { id: 2, title: 'Flor', description: 'Uma flor vermelha', img: '', type: 2 },
      { id: 3, title: 'Pizza', description: 'Pizza de pepperoni', img: '', type: 3 }
    ];
    component.searchQuery = ""; // Inicializa a busca vazia
    component.filteredCards = [...component.cards]; // Inicializa filteredCards como cópia de cards
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('getType: should return the correct type name for a known type', () => {
    expect(component.getType(1)).toEqual('Paisagem');
    expect(component.getType(2)).toEqual('Flor');
    expect(component.getType(3)).toEqual('Pizza');
  });

  it('getType: should return "Desconhecido" for an unknown type', () => {
    expect(component.getType(999)).toEqual('Desconhecido'); 
  });

   
   it('getBackgroundColor: should return the correct background color for a known type', () => {
    expect(component.getBackgroundColor(1)).toEqual('#BC2C1A');
    expect(component.getBackgroundColor(2)).toEqual('#134611');
    expect(component.getBackgroundColor(3)).toEqual('#D81159');
  });

 
  it('getBackgroundColor: should return the default color "#f9f9f9" for an unknown type', () => {
    expect(component.getBackgroundColor(999)).toEqual('#f9f9f9'); // Testando com um tipo que definitivamente não está mapeado
  });


  it('onSearchChange: should filter cards based on search input', () => {
    
    component.onSearchChange('Árvore');

    expect(component.filteredCards.length).toBe(1);
    expect(component.filteredCards[0].title).toEqual('Árvore');

    component.onSearchChange('vermelha');

    expect(component.filteredCards.length).toBe(1);
    expect(component.filteredCards[0].title).toEqual('Flor');

    component.onSearchChange('cachorro');
    expect(component.filteredCards.length).toBe(0);
  });

  it('onSearchChange: should handle case sensitivity in search', () => {
   
    component.onSearchChange('árvore');
    expect(component.filteredCards.length).toBe(1);
    expect(component.filteredCards[0].title).toEqual('Árvore');

    component.onSearchChange('PIZZA');
    expect(component.filteredCards.length).toBe(1);
    expect(component.filteredCards[0].title).toEqual('Pizza');
  });


  it('removeCard: should remove a card from the list', () => {
    expect(component.cards.length).toBe(3); 

    component.removeCard(1); 
    expect(component.cards.length).toBe(2); 
    expect(component.cards.findIndex(c => c.id === 2)).toBe(-1); 
  });

  it('removeCard: should update filteredCards after removing a card', () => {
    component.searchQuery = 'flor'; 
    component.onSearchChange(component.searchQuery); 
    expect(component.filteredCards.length).toBe(1); 

    component.removeCard(1); 
    expect(component.filteredCards.length).toBe(0); 
  });


});
