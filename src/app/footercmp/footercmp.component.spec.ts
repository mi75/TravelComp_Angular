import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootercmpComponent } from './footercmp.component';

describe('FootercmpComponent', () => {
  let component: FootercmpComponent;
  let fixture: ComponentFixture<FootercmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootercmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootercmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
