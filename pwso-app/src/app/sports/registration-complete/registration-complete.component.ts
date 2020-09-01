import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { currentRegistrant } from 'src/app/state/registrant.state';
import { Registrant } from 'src/app/models/registrant';

@Component({
  selector: 'app-registration-complete',
  templateUrl: './registration-complete.component.html',
  styleUrls: ['./registration-complete.component.scss']
})
export class RegistrationCompleteComponent implements OnInit {

  @Output() registerAnother = new EventEmitter();

  completionForm: FormGroup;
  message: string;
  registrant: Registrant;

  constructor(private formBuilder: FormBuilder, private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    this.buildCompletionForm(this.formBuilder);
    this.buildMessage();
    this.completionForm.controls.message.setValue(this.message);
    this.completionForm.controls.message.disable();
  }

  buildMessage() {
    this.message = 'The registration has been submitted for ';

    console.log(this.message);
    this.store.pipe(select(currentRegistrant))
    .subscribe(person => {
      console.log(person);
      if (person) {
        this.registrant = person;
        if (this.registrant.isVolunteer) {
          this.message = this.message + 'volunteer ';
        } else {
          this.message = this.message + 'athlete ';
        }

        console.log(this.message);
        this.message = this.buildName(this.message);
        this.message = this.message + 'in sport ' + this.registrant.sportName + '.';
        console.log(this.message);
        this.message = this.buildEmail(this.message);
        console.log(this.message);
        this.message = this.buildText(this.message);
        console.log(this.message);
      } else {
        this.message = 'A fatal error has occurred, please try again later.';
      }

    });



  }

  private buildText(message: string) {
    if (this.registrant.canText1 || this.registrant.canText2 || this.registrant.canText3) {
      message = message + 'Also a text will be sent to: ';
      if (this.registrant.canText1) {
        message = message + this.registrant.phone1 + ', ';
      }
      if (this.registrant.canText2) {
        message = message + this.registrant.phone2 + ', ';
      }
      if (this.registrant.canText3) {
        message = message + this.registrant.phone3 + ', ';
      }
    }
    return message;
  }

  private buildEmail(message: string) {
    message = message + 'When the registration is complete you will get an Email at ' + this.registrant.email1;

    if (this.registrant.email2) {
      message = message + ', ' + this.registrant.email2;
    }

    if (this.registrant.email3) {
      message = message + ', ' + this.registrant.email3;
    }

    message = message + '. ';
    return message;
  }

  private buildName(message: string) {
    message = message + this.registrant.firstName + ' ';

    if (this.registrant.nickName) {
      message = message + '( ' + this.registrant.nickName + ' ) ';
    }

    message = message + this.registrant.lastName + ' ';
    return message;
  }

  buildCompletionForm(formBuilder: FormBuilder) {

    this.completionForm = formBuilder.group(
      {
        message: new FormControl(),
      }
    );
  }

  clickAnother() {
    this.registerAnother.emit(true);
  }

  anotherRegistration() {
  }

  clickFinish() {
    this.router.navigate(['/dashboard']);
  }
}
