import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectDialogComponent } from './correct-dialog.component';

describe('CorrectDialogComponent', () => {
  let component: CorrectDialogComponent;
  let fixture: ComponentFixture<CorrectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrectDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CorrectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
