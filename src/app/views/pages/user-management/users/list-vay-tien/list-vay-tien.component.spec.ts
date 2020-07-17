import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVayTienComponent } from './list-vay-tien.component';

describe('ListVayTienComponent', () => {
  let component: ListVayTienComponent;
  let fixture: ComponentFixture<ListVayTienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVayTienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVayTienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
