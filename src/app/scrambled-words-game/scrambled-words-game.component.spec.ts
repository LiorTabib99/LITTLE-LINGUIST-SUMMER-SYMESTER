import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrambledWordsGameComponent } from './scrambled-words-game.component';

describe('ScrambledWordsGameComponent', () => {
  let component: ScrambledWordsGameComponent;
  let fixture: ComponentFixture<ScrambledWordsGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrambledWordsGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScrambledWordsGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
