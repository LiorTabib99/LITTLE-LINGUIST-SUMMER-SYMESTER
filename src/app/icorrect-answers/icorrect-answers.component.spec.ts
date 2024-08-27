import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcorrectAnswersComponent } from './icorrect-answers.component';

describe('IcorrectAnswersComponent', () => {
  let component: IcorrectAnswersComponent;
  let fixture: ComponentFixture<IcorrectAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcorrectAnswersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IcorrectAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
