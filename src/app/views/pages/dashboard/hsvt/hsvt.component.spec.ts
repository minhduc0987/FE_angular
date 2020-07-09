import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HsvtComponent } from './hsvt.component';

describe('HsvtComponent', () => {
  let component: HsvtComponent;
  let fixture: ComponentFixture<HsvtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HsvtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HsvtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
