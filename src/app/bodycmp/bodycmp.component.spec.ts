import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodycmpComponent } from './bodycmp.component';

describe('BodycmpComponent', () => {
  let component: BodycmpComponent;
  let fixture: ComponentFixture<BodycmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodycmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodycmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
