import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeUserComponent } from './notice-user.component';

describe('NoticeUserComponent', () => {
  let component: NoticeUserComponent;
  let fixture: ComponentFixture<NoticeUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
