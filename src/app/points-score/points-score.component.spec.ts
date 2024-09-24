import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsScoreComponent } from './points-score.component';

describe('PointsScoreComponent', () => {
  let component: PointsScoreComponent;
  let fixture: ComponentFixture<PointsScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointsScoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PointsScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
