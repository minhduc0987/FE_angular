import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHsvtComponent } from './list-hsvt.component';

describe('ListHsvtComponent', () => {
  let component: ListHsvtComponent;
  let fixture: ComponentFixture<ListHsvtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHsvtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHsvtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
