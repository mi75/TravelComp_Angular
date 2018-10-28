import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFeatureFormComponent } from './modal-feature-form.component';

describe('ModalFeatureFormComponent', () => {
  let component: ModalFeatureFormComponent;
  let fixture: ComponentFixture<ModalFeatureFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFeatureFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFeatureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
