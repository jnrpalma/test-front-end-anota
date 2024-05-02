import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms'; // Importante para lidar com ngModel

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SearchComponent,
        FormsModule 
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    inputElement = fixture.nativeElement.querySelector('input');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onInputChange: should emit the input value when changed', () => {
    spyOn(component.filterChange, 'emit'); 
    const event = new Event('input');
    inputElement.value = 'test';
    inputElement.dispatchEvent(event);
    
    fixture.detectChanges(); 

    expect(component.filterChange.emit).toHaveBeenCalledWith('test'); 
  });
});
