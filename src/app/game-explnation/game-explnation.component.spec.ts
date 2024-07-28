import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameExplnationComponent } from './game-explnation.component';

describe('GameExplnationComponent', () => {
  let component: GameExplnationComponent;
  let fixture: ComponentFixture<GameExplnationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameExplnationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameExplnationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
