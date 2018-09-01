import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsFeaturesListComponent } from './trips-features-list.component';

describe('TripsFeaturesListComponent', () => {
  let component: TripsFeaturesListComponent;
  let fixture: ComponentFixture<TripsFeaturesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripsFeaturesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsFeaturesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
