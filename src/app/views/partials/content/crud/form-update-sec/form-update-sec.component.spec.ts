import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateSecComponent } from './form-update-sec.component';

describe('FormUpdateSecComponent', () => {
  let component: FormUpdateSecComponent;
  let fixture: ComponentFixture<FormUpdateSecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUpdateSecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUpdateSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
