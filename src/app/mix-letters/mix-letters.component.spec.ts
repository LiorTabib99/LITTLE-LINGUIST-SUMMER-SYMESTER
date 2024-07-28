import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixLettersComponent } from './mix-letters.component';

describe('MixLettersComponent', () => {
  let component: MixLettersComponent;
  let fixture: ComponentFixture<MixLettersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MixLettersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MixLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
