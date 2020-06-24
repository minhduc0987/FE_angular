import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeOutComponent } from './exchange-out.component';

describe('ExchangeOutComponent', () => {
  let component: ExchangeOutComponent;
  let fixture: ComponentFixture<ExchangeOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
