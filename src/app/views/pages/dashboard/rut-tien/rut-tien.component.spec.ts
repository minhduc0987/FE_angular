import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutTienComponent } from './rut-tien.component';

describe('RutTienComponent', () => {
  let component: RutTienComponent;
  let fixture: ComponentFixture<RutTienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutTienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutTienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
