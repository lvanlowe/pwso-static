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
import { RegistrationComponent } from './sports/registration/registration.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { SportPickerComponent } from './sports/sport-picker/sport-picker.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ReactiveFormsModule } from '@angular/forms';
import { Sport } from './models/sport';
import { SportService } from './services/sport.service';
import { HttpClientModule } from '@angular/common/http';






@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RegistrationComponent,
    SportPickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer, { metaReducers: appMetaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    NgrxAutoEntityModule.forRoot(),
    ButtonsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    LayoutModule,
    TooltipModule,
    DropDownsModule,
  ],
  providers: [{ provide: Sport, useClass: SportService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
