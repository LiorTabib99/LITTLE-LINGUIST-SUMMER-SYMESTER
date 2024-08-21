import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMatchGameComponent } from './dialog-match-game.component';

describe('DialogMatchGameComponent', () => {
  let component: DialogMatchGameComponent;
  let fixture: ComponentFixture<DialogMatchGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogMatchGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogMatchGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
