import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './sports/registration/registration.component';
import { PendingChangesGuard } from './services/pending-changes.guard';
import { MedicalAddComponent } from './medical/medical-add/medical-add.component';
import { MedicalDashboradComponent } from './medical/medical-dashborad/medical-dashborad.component';

// const routes: Routes = [];

export const routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent, text: 'Dashboard', icon: 'k-i-globe-outline' },
  { path: 'registration',
    component: RegistrationComponent,
    text: 'Registration',
    icon: 'k-i-wrench',
    canDeactivate: [PendingChangesGuard] },
  { path: 'medical',
    component: MedicalDashboradComponent,
    text: 'Medical',
    icon: 'k-i-myspace',
    // canDeactivate: [PendingChangesGuard]
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
