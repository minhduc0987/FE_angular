import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSecComponent } from './list-sec.component';

describe('ListSecComponent', () => {
  let component: ListSecComponent;
  let fixture: ComponentFixture<ListSecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
