import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Create } from '@briebug/ngrx-auto-entity';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Athlete } from 'src/app/models/athlete';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-medical-add',
  templateUrl: './medical-add.component.html',
  styleUrls: ['./medical-add.component.scss']
})
export class MedicalAddComponent implements OnInit {

  uploadSaveUrl = `http://localhost:7071/api/UploadMedicalFunc`; // should represent an actual API endpoint
  athleteForm: FormGroup;

  canSave = true;
  athleteSaved = false;
  athlete: Athlete;
  public stepType = 'full';
  public stepTypes: Array<string> = ['indicator', 'label', 'full'];
  public current = 0;
  public phoneTypes: Array<string> = ['home', 'mobile', 'other'];

  public steps = [
    { label: 'Athlete', isValid: true },
    { label: 'Parent', isValid: false },
    { label: 'Medical Dates', isValid: true },
    { label: 'Medical Form', isValid: true }
];
  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit() {
    this.buildRegistrationForm(this.formBuilder);
    this.athleteForm.markAsPristine();
  }

  buildRegistrationForm(formBuilder: FormBuilder) {
    this.athleteForm = formBuilder.group(
      {

      }
      );

    }

    public saveAthlete() {
      this.athleteForm.markAllAsTouched();
      if (this.athleteForm.valid) {
        this.athlete = {...this.athleteForm.value};
        this.athleteForm.markAsPristine();

        this.store.dispatch(new Create(Athlete, this.athlete));
        this.athleteSaved = true;
      }
    }

    public showParent(athlete) {
      this.athlete = {...athlete};
      this.current = 1;
    }

    public showFormDates(athleteParent) {
      this.athlete = {...this.athlete, parentInformation: athleteParent};
      this.current = 2;
    }

    public showFormUpload(athlete) {
      this.current = 3;
    }
    canDeactivate(): Observable<boolean> | boolean {
      return this.athleteForm.pristine;
    }
}
