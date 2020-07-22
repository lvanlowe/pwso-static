import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportPickerComponent } from './sport-picker.component';

describe('SportPickerComponent', () => {
  let component: SportPickerComponent;
  let fixture: ComponentFixture<SportPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
