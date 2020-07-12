import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeChatComponent } from './notice-chat.component';

describe('NoticeChatComponent', () => {
  let component: NoticeChatComponent;
  let fixture: ComponentFixture<NoticeChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
