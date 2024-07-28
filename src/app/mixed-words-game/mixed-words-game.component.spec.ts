import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixedWordsGameComponent } from './mixed-words-game.component';

describe('MixedWordsGameComponent', () => {
  let component: MixedWordsGameComponent;
  let fixture: ComponentFixture<MixedWordsGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MixedWordsGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MixedWordsGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
