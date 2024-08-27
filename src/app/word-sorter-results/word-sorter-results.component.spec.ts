import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSorterResultsComponent } from './word-sorter-results.component';

describe('WordSorterResultsComponent', () => {
  let component: WordSorterResultsComponent;
  let fixture: ComponentFixture<WordSorterResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordSorterResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WordSorterResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
