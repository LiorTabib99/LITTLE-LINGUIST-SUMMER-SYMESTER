import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviaEndgameDialogComponent } from './trivia-endgame-dialog.component';

describe('TriviaEndgameDialogComponent', () => {
  let component: TriviaEndgameDialogComponent;
  let fixture: ComponentFixture<TriviaEndgameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriviaEndgameDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TriviaEndgameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
