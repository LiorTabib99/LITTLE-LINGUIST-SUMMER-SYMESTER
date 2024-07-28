import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccumulatingPointsComponent } from './accumulating-points.component';

describe('AccumulatingPointsComponent', () => {
  let component: AccumulatingPointsComponent;
  let fixture: ComponentFixture<AccumulatingPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccumulatingPointsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccumulatingPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
