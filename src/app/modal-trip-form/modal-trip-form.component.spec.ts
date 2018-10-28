import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTripFormComponent } from './modal-trip-form.component';

describe('ModalTripFormComponent', () => {
  let component: ModalTripFormComponent;
  let fixture: ComponentFixture<ModalTripFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTripFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTripFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
