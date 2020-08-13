import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { currentSportHasUniforms } from 'src/app/state/sport.state';
import { Registrant } from 'src/app/models/registrant';
import { Create } from '@briebug/ngrx-auto-entity';
import { savingRegistrant } from 'src/app/state/registrant.state';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  canDisplay = false;
  showCompletion = false;
  hasUniforms = false;
  canRegister = true;
  isSaving: boolean;
  registrant: Registrant;
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
    this.store.pipe(select(savingRegistrant))
    .subscribe(saving => {
        this.isSaving = saving;
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

  }

  showScreen(canShow) {
    this.canDisplay = canShow;
  }

  restart(refresh) {
    this.registrationForm.controls.firstName.setValue('');
    this.registrationForm.controls.lastName.setValue('');
    this.registrationForm.controls.nickName.setValue('');
    this.registrationForm.controls.size.setValue('');
    this.showCompletion = false;
    this.canDisplay = true;
  }

  checkForm() {
    // if (this.registrationForm.valid && !this.registrationForm.errors) {
    //   this.canSubmit = true;
    // } else {
    //   this.canSubmit = false;
    // }
  }

  clearForm() {
    this.registrationForm.reset();
  }

  registerAthlete() {
    // this.registrant.firstName = this.registrationForm.controls.firstName.value;
    // this.registrant.lastName = this.registrationForm.controls.lastName.value;
    // this.registrant = {...this.registrationForm.value};
    // this.registrationForm.markAllAsTouched();
    this.store.dispatch(new Create(Registrant, this.registrant));
    this.canDisplay  = false;
    this.showCompletion = true;
  }
}
