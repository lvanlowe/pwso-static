import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

// const routes: Routes = [];

export const routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent, text: 'Dashboard', icon: 'k-i-globe-outline' },
  // { path: 'deacon', component: DeaconReviewComponent, text: 'Deacon', icon: 'k-i-wrench' },
  // { path: 'nursery', component: NurseryReviewComponent, text: 'Nursery', icon: 'k-i-preview' },
  // { path: 'usher', component: UsherReviewComponent, text: 'Usher', icon: 'k-i-gears' },
  // {
  //   path: 'products',
  //   loadChildren: () =>
  //     import('./products/products.module').then((m) => m.ProductsModule),
  // },
  // { path: 'discounts', component: DiscountComponent },
  // { path: '**', component: NotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
