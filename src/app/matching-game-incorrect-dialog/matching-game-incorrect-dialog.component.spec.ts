import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingGameIncorrectDialogComponent } from './matching-game-incorrect-dialog.component';

describe('MatchingGameIncorrectDialogComponent', () => {
  let component: MatchingGameIncorrectDialogComponent;
  let fixture: ComponentFixture<MatchingGameIncorrectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchingGameIncorrectDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchingGameIncorrectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
