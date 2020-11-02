import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalAddComponent } from './medical-add.component';

describe('MedicalAddComponent', () => {
  let component: MedicalAddComponent;
  let fixture: ComponentFixture<MedicalAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
