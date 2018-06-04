import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainReviewsComponent } from './main-reviews.component';

describe('MainReviewsComponent', () => {
  let component: MainReviewsComponent;
  let fixture: ComponentFixture<MainReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
