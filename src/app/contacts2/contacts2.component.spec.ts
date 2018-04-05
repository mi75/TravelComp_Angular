import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Contacts2Component } from './contacts2.component';

describe('Contacts2Component', () => {
  let component: Contacts2Component;
  let fixture: ComponentFixture<Contacts2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Contacts2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Contacts2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
