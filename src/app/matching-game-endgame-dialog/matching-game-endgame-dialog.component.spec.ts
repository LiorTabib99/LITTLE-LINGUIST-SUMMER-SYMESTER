import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingGameEndgameDialogComponent } from './matching-game-endgame-dialog.component';

describe('MatchingGameEndgameDialogComponent', () => {
  let component: MatchingGameEndgameDialogComponent;
  let fixture: ComponentFixture<MatchingGameEndgameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchingGameEndgameDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchingGameEndgameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
