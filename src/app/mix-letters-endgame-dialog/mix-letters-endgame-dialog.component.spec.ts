import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixLettersEndgameDialogComponent } from './mix-letters-endgame-dialog.component';

describe('MixLettersEndgameDialogComponent', () => {
  let component: MixLettersEndgameDialogComponent;
  let fixture: ComponentFixture<MixLettersEndgameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MixLettersEndgameDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MixLettersEndgameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
