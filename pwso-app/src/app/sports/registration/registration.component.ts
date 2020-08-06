import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { currentSportHasUniforms } from 'src/app/state/sport.state';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  canDisplay = false;
  hasUniforms = false;
  canSubmit = false;
  registrationForm: FormGroup;
  public listItems: Array<string> = ['Small', 'Medium', 'Large', 'X-Large', 'XXL'];
  public phoneTypes: Array<string> = ['home', 'mobile', 'other'];

  public mask = '(000) 000-0000';

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit() {
    this.buildRegistrationForm(this.formBuilder);
    this.registrationForm.markAsPristine();
    this.store.pipe(select(currentSportHasUniforms))
      .subscribe(hasUniforms => {
          console.log('check uniforms');
          this.hasUniforms = hasUniforms;
          if (hasUniforms) {
            this.registrationForm.controls.size.setValidators([Validators.required]);
          }
        });

    this.registrationForm.valueChanges
    .subscribe(value => {
        console.log('form changed');
        this.checkForm();
    });
  }


  buildRegistrationForm(formBuilder: FormBuilder) {
    this.registrationForm = formBuilder.group(
      {
        // sport: [null, [Validators.required]],
        // program: [null, [Validators.required]],
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        nickName: new FormControl(),
        size: new FormControl(),
        email1: new FormControl('', [Validators.email, Validators.required]),
        email2: new FormControl('', Validators.email),
        email3: new FormControl('', Validators.email),
        phone1: new FormControl('', Validators.required),
        phone1Type: new FormControl('', Validators.required),
        canText1: new FormControl(),
        phone2: new FormControl(),
        phone2Type: new FormControl(),
        canText2: new FormControl(),
        phone3: new FormControl(),
        phone3Type: new FormControl(),
        canText3: new FormControl()
      }
    );

    // this.sportName = this.registrationForm.get('sport');
    // this.programName = this.registrationForm.get('program');
  }
  showScreen(canShow) {
    this.canDisplay = canShow;
  }

  checkForm() {
    if (this.registrationForm.valid && !this.registrationForm.errors) {
      this.canSubmit = true;
    } else {
      this.canSubmit = false;
    }
  }

  clearForm() {
    this.registrationForm.reset();
  }

  submitForm() {

  }
}
