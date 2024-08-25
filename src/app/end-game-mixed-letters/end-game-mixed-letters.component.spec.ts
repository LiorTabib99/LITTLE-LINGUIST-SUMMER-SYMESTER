import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndGameMixedLettersComponent } from './end-game-mixed-letters.component';

describe('EndGameMixedLettersComponent', () => {
  let component: EndGameMixedLettersComponent;
  let fixture: ComponentFixture<EndGameMixedLettersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndGameMixedLettersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EndGameMixedLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
