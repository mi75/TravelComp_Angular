import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MSlider2Component } from './m-slider2.component';

describe('MSlider2Component', () => {
  let component: MSlider2Component;
  let fixture: ComponentFixture<MSlider2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MSlider2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MSlider2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
