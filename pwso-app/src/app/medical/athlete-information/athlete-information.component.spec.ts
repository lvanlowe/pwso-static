import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteInformationComponent } from './athlete-information.component';

describe('AthleteInformationComponent', () => {
  let component: AthleteInformationComponent;
  let fixture: ComponentFixture<AthleteInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AthleteInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleteInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
