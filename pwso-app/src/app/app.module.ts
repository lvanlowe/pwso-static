import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { appReducer, appMetaReducers } from './state/app.state';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule, MatRadioModule, MatSliderModule, MatProgressSpinnerModule} from '@angular/material'
import { RegistrationComponent } from './sports/registration/registration.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { SportPickerComponent } from './sports/sport-picker/sport-picker.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ReactiveFormsModule } from '@angular/forms';
import { Sport } from './models/sport';
import { SportService } from './services/sport.service';
import { HttpClientModule } from '@angular/common/http';
import { Program } from './models/program';
import { ProgramService } from './services/program.service';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { Registrant } from './models/registrant';
import { RegistrantService } from './services/registrant.service';
import { RegistrationCompleteComponent } from './sports/registration-complete/registration-complete.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { PendingChangesGuard } from './services/pending-changes.guard';
import { RegistrantEffects } from './state/registrant.state';
import { SportEffects } from './state/sport.state';
import { ProgramEffects } from './state/program.state';
import { MedicalAddComponent } from './medical/medical-add/medical-add.component';
import { UploadModule } from '@progress/kendo-angular-upload';
import { AthleteEffects } from './state/athlete.state';
import { Athlete } from './models/athlete';
import { AthleteService } from './services/athlete.service';
import { AthleteInformationComponent } from './medical/athlete-information/athlete-information.component';
import { AthleteParentComponent } from './medical/athlete-parent/athlete-parent.component';
import { MedicalInformationComponent } from './medical/medical-information/medical-information.component';
import { MedicalFormComponent } from './medical/medical-form/medical-form.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RegistrationComponent,
    SportPickerComponent,
    RegistrationCompleteComponent,
    MedicalAddComponent,
    AthleteInformationComponent,
    AthleteParentComponent,
    MedicalInformationComponent,
    MedicalFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer, { metaReducers: appMetaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([RegistrantEffects, SportEffects, ProgramEffects, AthleteEffects]),
    NgrxAutoEntityModule.forRoot(),
    ButtonsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    LayoutModule,
    TooltipModule,
    DropDownsModule,
    InputsModule,
    LabelModule,
    DateInputsModule,
    DialogsModule,
    UploadModule,
  ],
  providers: [
    { provide: Sport, useClass: SportService },
    { provide: Program, useClass: ProgramService },
    { provide: Registrant, useClass: RegistrantService },
    { provide: Athlete, useClass: AthleteService },
    PendingChangesGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
