import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  canDisplay = false;
  registrationForm: FormGroup;
  public listItems: Array<string> = ["X-Small", "Small", "Medium", "Large", "X-Large", "2X-Large"];
  public phoneTypes: Array<string> = ['home', 'mobile', 'other'];

  public mask = '(999) 000-0000';

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit() {
    this.buildRegistrationForm(this.formBuilder);
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
        email1: new FormControl('', Validators.email),
        email2: new FormControl('', Validators.email),
        email3: new FormControl('', Validators.email),
        phone1: new FormControl(),
        phone1Type: new FormControl(),
        acceptNews: new FormControl()

      }
    );

    // this.sportName = this.registrationForm.get('sport');
    // this.programName = this.registrationForm.get('program');
  }
  showScreen(canShow) {
    this.canDisplay = canShow;
  }

  clearForm() {

  }

  submitForm() {}
}
