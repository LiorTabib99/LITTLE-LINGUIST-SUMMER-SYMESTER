import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayWordComponent } from './display-word.component';

describe('DisplayWordComponent', () => {
  let component: DisplayWordComponent;
  let fixture: ComponentFixture<DisplayWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayWordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
