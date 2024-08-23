import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingGameCorrectDialogComponent } from './matching-game-correct-dialog.component';

describe('MatchingGameCorrectDialogComponent', () => {
  let component: MatchingGameCorrectDialogComponent;
  let fixture: ComponentFixture<MatchingGameCorrectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchingGameCorrectDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchingGameCorrectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
