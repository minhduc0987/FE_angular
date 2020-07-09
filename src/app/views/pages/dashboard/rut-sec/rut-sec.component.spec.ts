import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutSecComponent } from './rut-sec.component';

describe('RutSecComponent', () => {
  let component: RutSecComponent;
  let fixture: ComponentFixture<RutSecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutSecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
