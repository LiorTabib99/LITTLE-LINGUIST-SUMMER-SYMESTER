import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixedLettersResultsComponent } from './mixed-letters-results.component';

describe('MixedLettersResultsComponent', () => {
  let component: MixedLettersResultsComponent;
  let fixture: ComponentFixture<MixedLettersResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MixedLettersResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MixedLettersResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
