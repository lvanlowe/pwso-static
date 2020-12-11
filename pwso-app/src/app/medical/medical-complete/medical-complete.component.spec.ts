import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalCompleteComponent } from './medical-complete.component';

describe('MedicalCompleteComponent', () => {
  let component: MedicalCompleteComponent;
  let fixture: ComponentFixture<MedicalCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
