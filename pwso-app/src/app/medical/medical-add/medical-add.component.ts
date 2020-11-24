import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

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
  public phoneTypes: Array<string> = ['home', 'mobile', 'other'];

  // uploadSaveUrl = `http://localhost:7071/api/medical`; // should represent an actual API endpoint
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildRegistrationForm(this.formBuilder);
  }

  buildRegistrationForm(formBuilder: FormBuilder) {
    this.athleteForm = formBuilder.group(
      {
        // sport: [null, [Validators.required]],
        // program: [null, [Validators.required]],
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        middleName: new FormControl(),
        birthDate: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.email, Validators.required]),
        // email2: new FormControl('', Validators.email),
        // email3: new FormControl('', Validators.email),
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
        // canText2 : new FormControl(false),
        medicalForm: new FormControl(),
        medicalExpirationDate: new FormControl('', Validators.required),
        // canText3: new FormControl(false)
      }
      );
      // this.athleteForm.controls.phone1Type.disable();
      // this.athleteForm.controls.phone2Type.disable();
      // this.athleteForm.controls.phone3Type.disable();

    }

    canDeactivate(): Observable<boolean> | boolean {
      return this.athleteForm.pristine;
    }
}
