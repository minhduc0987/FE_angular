import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeInComponent } from './exchange-in.component';

describe('ExchangeInComponent', () => {
  let component: ExchangeInComponent;
  let fixture: ComponentFixture<ExchangeInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
