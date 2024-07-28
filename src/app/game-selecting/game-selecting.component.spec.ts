import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSelectingComponent } from './game-selecting.component';

describe('GameSelectingComponent', () => {
  let component: GameSelectingComponent;
  let fixture: ComponentFixture<GameSelectingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSelectingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameSelectingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});














































