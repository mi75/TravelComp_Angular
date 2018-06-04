import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReviewsFormComponent } from './modal-reviews-form.component';

describe('ModalReviewsFormComponent', () => {
  let component: ModalReviewsFormComponent;
  let fixture: ComponentFixture<ModalReviewsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalReviewsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalReviewsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
