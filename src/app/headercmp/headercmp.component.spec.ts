import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadercmpComponent } from './headercmp.component';

describe('HeadercmpComponent', () => {
  let component: HeadercmpComponent;
  let fixture: ComponentFixture<HeadercmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadercmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadercmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
