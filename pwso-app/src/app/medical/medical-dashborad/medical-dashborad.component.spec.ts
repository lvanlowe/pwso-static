import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalDashboradComponent } from './medical-dashborad.component';

describe('MedicalDashboradComponent', () => {
  let component: MedicalDashboradComponent;
  let fixture: ComponentFixture<MedicalDashboradComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalDashboradComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalDashboradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
