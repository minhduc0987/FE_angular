import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InpitOtpComponent } from './inpit-otp.component';

describe('InpitOtpComponent', () => {
  let component: InpitOtpComponent;
  let fixture: ComponentFixture<InpitOtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InpitOtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InpitOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
