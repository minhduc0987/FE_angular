import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChatUnreadComponent } from './list-chat-unread.component';

describe('ListChatUnreadComponent', () => {
  let component: ListChatUnreadComponent;
  let fixture: ComponentFixture<ListChatUnreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListChatUnreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChatUnreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
