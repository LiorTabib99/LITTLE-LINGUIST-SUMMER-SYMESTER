import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixLettersResultsComponent } from './mix-letters-results.component';

describe('MixLettersResultsComponent', () => {
  let component: MixLettersResultsComponent;
  let fixture: ComponentFixture<MixLettersResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MixLettersResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MixLettersResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
