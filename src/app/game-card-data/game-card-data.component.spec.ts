import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCardDataComponent } from './game-card-data.component';

describe('GameCardDataComponent', () => {
  let component: GameCardDataComponent;
  let fixture: ComponentFixture<GameCardDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameCardDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameCardDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
