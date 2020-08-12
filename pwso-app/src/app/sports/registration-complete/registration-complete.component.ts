import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registration-complete',
  templateUrl: './registration-complete.component.html',
  styleUrls: ['./registration-complete.component.scss']
})
export class RegistrationCompleteComponent implements OnInit {

  @Output() registerAnother = new EventEmitter();

  completionForm: FormGroup;
  message: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildCompletionForm(this.formBuilder);
    this.completionForm.controls.message.setValue('This is the message');
    this.completionForm.controls.message.disable();

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

  clickFinish() {}
}
