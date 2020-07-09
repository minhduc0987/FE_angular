import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHsComponent } from './create-hs.component';

describe('CreateHsComponent', () => {
  let component: CreateHsComponent;
  let fixture: ComponentFixture<CreateHsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
