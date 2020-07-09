import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeExchangeComponent } from './notice-exchange.component';

describe('NoticeExchangeComponent', () => {
  let component: NoticeExchangeComponent;
  let fixture: ComponentFixture<NoticeExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
