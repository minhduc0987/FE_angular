import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastExchangeComponent } from './fast-exchange.component';

describe('FastExchangeComponent', () => {
  let component: FastExchangeComponent;
  let fixture: ComponentFixture<FastExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
