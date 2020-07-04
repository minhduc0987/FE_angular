import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiTienComponent } from './gui-tien.component';

describe('GuiTienComponent', () => {
  let component: GuiTienComponent;
  let fixture: ComponentFixture<GuiTienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiTienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiTienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
