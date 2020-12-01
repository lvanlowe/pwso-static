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
  genderGroup: FormGroup;
  public mask = '(000) 000-0000';
  canSave = true;
  athleteSaved = false;
  athlete: Athlete;
  public stepType = 'full';
  public stepTypes: Array<string> = ['indicator', 'label', 'full'];
  public current = 2;
  public phoneTypes: Array<string> = ['home', 'mobile', 'other'];

  public steps = [
    { label: 'Start', isValid: true },
    { label: 'Enter Info', isValid: false },
    { label: 'Upload Form', isValid: true },
    { label: 'Finish', isValid: true }
];
  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit() {
    this.buildRegistrationForm(this.formBuilder);
    this.athleteForm.markAsPristine();
  }

  buildRegistrationForm(formBuilder: FormBuilder) {
    this.athleteForm = formBuilder.group(
      {
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        middleName: new FormControl(),
        birthDate: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.email, Validators.required]),
        gender: new FormControl('', Validators.required),
        street: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        zipCode: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        parentName: new FormControl(),
        relationship: new FormControl(),
        parentStreet: new FormControl(''),
        parentCity: new FormControl(''),
        parentState: new FormControl(''),
        parentZipCode: new FormControl(''),
        parentPhone: new FormControl(''),
        parentEmail: new FormControl('', Validators.email),
        medicalDate: new FormControl('', Validators.required),
        medicalForm: new FormControl(),
        medicalExpirationDate: new FormControl('', Validators.required),
      }
      );
      // this.athleteForm.controls.phone1Type.disable();
      // this.athleteForm.controls.phone2Type.disable();
      // this.athleteForm.controls.phone3Type.disable();

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
    canDeactivate(): Observable<boolean> | boolean {
      return this.athleteForm.pristine;
    }
}
