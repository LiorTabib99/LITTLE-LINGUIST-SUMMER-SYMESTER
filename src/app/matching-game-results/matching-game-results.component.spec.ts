import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingGameResultsComponent } from './matching-game-results.component';

describe('MatchingGameResultsComponent', () => {
  let component: MatchingGameResultsComponent;
  let fixture: ComponentFixture<MatchingGameResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchingGameResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchingGameResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
