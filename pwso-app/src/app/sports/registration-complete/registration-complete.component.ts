import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-complete',
  templateUrl: './registration-complete.component.html',
  styleUrls: ['./registration-complete.component.scss']
})
export class RegistrationCompleteComponent implements OnInit {

  @Output() registerAnother = new EventEmitter();

  completionForm: FormGroup;
  message: string;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.buildCompletionForm(this.formBuilder);
    this.completionForm.controls.message.setValue(this.buildMessage());
    this.completionForm.controls.message.disable();
  }

  buildMessage(): string {
    let message = 'The registration has been submitted for ';

    return 'When the registration is complete you will get an Email';
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
