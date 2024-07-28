import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortGameComponent } from './sort-game.component';

describe('SortGameComponent', () => {
  let component: SortGameComponent;
  let fixture: ComponentFixture<SortGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
