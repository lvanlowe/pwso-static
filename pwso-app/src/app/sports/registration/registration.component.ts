import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { currentSportHasUniforms, currentSport } from 'src/app/state/sport.state';
import { Registrant } from 'src/app/models/registrant';
import { Create } from '@briebug/ngrx-auto-entity';
import { savingRegistrant } from 'src/app/state/registrant.state';
import { currentProgram } from 'src/app/state/program.state';
import { Program } from 'src/app/models/program';
import { ComponentCanDeactivate } from 'src/app/services/pending-changes.guard';
import { Observable } from 'rxjs';
import { Sport } from 'src/app/models/sport';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, ComponentCanDeactivate  {
  canDisplay = false;
  showCompletion = false;
  hasUniforms = false;
  canRegister = true;
  isSaving: boolean;
  registrantSaved = false;
  registrant: Registrant;
  currentProgram: Program;
  currentSport: Sport;
  registrantType = 'Athlete';
  registrationForm: FormGroup;
  public listItems: Array<string> = ['Small', 'Medium', 'Large', 'X-Large', 'XXL'];
  public phoneTypes: Array<string> = ['home', 'mobile', 'other'];

  public mask = '(000) 000-0000';
  opened = false;
  textOpened = false;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }
  get displaySize(): boolean {
    if (this.registrantType === 'Athlete') {
      return this.hasUniforms;
    } else {
      return false;
    }
  }

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
        console.log('issaving');
        this.isSaving = saving;
        if (!this.isSaving && this.registrantSaved) {
          this.registrantSaved = false;
          this.canDisplay  = false;
          this.showCompletion = true;
        }
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
    if (canShow === 'C' ) {
      this.canDisplay = false;
    } else {
      this.canDisplay = true;
      if (canShow === 'A') {
        this.registrantType = 'Athlete';
      } else {
        this.registrantType = 'Volunteer';
      }
    }
  }

  restart(refresh) {
    this.registrationForm.controls.firstName.setValue('');
    this.registrationForm.controls.lastName.setValue('');
    this.registrationForm.controls.nickName.setValue('');
    this.registrationForm.controls.size.setValue('');
    this.showCompletion = false;
    this.canDisplay = true;
  }

  // checkForm() {
  //   // if (this.registrationForm.valid && !this.registrationForm.errors) {
  //   //   this.canSubmit = true;
  //   // } else {
  //   //   this.canSubmit = false;
  //   // }
  // }

  clearForm() {
    this.registrationForm.reset();
  }

  registerAthlete() {

    this.registrant = {...this.registrationForm.value};
    this.registrant.programId = this.currentProgram.id;
    this.registrant.programName = this.currentProgram.name;
    this.registrant.sportId = this.currentProgram.sportid;
    this.registrant.sportName = this.currentSport.name;
    if (this.registrantType === 'Athlete') {
      this.registrant.isVolunteer = false;
    } else {
      this.registrant.isVolunteer = true;
    }
    console.log(this.registrant);
    this.registrationForm.markAsPristine();

    this.store.dispatch(new Create(Registrant, this.registrant));
    this.registrantSaved = true;

  }

  public close(status) {
    console.log(`Dialog result: ${status}`);
    this.opened = false;
    if (status === 'yes') {
        this.checkForText();
    }
  }

  public textClose(status) {
    console.log(`Dialog result: ${status}`);
    this.textOpened = false;
    if (status === 'yes') {
        this.registerAthlete();
    }
  }

  public checkForWaitList() {
    this.store.pipe(select(currentSport))
    .subscribe(sport => {
      this.currentSport = sport;
    });
    this.store.pipe(select(currentProgram))
    .subscribe(program => {
      this.currentProgram = program;
      if (this.currentProgram.isWaitlist === true ) {
        this.opened = true;
      } else {
        this.checkForText();
      }
    });
  }

  public checkForText() {
    if (this.registrationForm.controls.canText1.value ||
      this.registrationForm.controls.canText2.value ||
      this.registrationForm.controls.canText3.value) {
        this.registerAthlete();
    } else {
      this.textOpened = true;
    }

  }

  canDeactivate(): Observable<boolean> | boolean {
    return this.registrationForm.pristine;
  }
}
