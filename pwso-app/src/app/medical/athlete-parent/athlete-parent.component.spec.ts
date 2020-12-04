import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteParentComponent } from './athlete-parent.component';

describe('AthleteParentComponent', () => {
  let component: AthleteParentComponent;
  let fixture: ComponentFixture<AthleteParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AthleteParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleteParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
