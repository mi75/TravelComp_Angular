import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewToursFeatureComponent } from './new-tours-feature.component';

describe('NewToursFeatureComponent', () => {
  let component: NewToursFeatureComponent;
  let fixture: ComponentFixture<NewToursFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewToursFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewToursFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
