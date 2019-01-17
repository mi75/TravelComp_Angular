import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FromInstagramComponent } from './from-instagram.component';

describe('FromInstagramComponent', () => {
  let component: FromInstagramComponent;
  let fixture: ComponentFixture<FromInstagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FromInstagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FromInstagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
