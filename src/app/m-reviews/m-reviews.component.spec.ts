import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MReviewsComponent } from './m-reviews.component';

describe('MReviewsComponent', () => {
  let component: MReviewsComponent;
  let fixture: ComponentFixture<MReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
