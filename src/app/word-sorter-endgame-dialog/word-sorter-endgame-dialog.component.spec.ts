import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSorterEndgameDialogComponent } from './word-sorter-endgame-dialog.component';

describe('WordSorterEndgameDialogComponent', () => {
  let component: WordSorterEndgameDialogComponent;
  let fixture: ComponentFixture<WordSorterEndgameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordSorterEndgameDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WordSorterEndgameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
