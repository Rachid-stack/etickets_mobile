import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'inscription',
    loadChildren: () => import('./inscription/inscription.module').then( m => m.InscriptionPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'search-result',
    loadChildren: () => import('./search-result/search-result.module').then( m => m.SearchResultPageModule)
  },
  {
    path: 'seat-choose/:id',
    loadChildren: () => import('./seat-choose/seat-choose.module').then( m => m.SeatChoosePageModule)
  },
  {
    path: 'confirm-booking',
    loadChildren: () => import('./confirm-booking/confirm-booking.module').then( m => m.ConfirmBookingPageModule)
  },
  {
    path: 'tiers-form/:data',
    loadChildren: () => import('./tiers-form/tiers-form.module').then( m => m.TiersFormPageModule)
  },
  {
    path: 'confirm-paiement',
    loadChildren: () => import('./confirm-paiement/confirm-paiement.module').then( m => m.ConfirmPaiementPageModule)
  },
  {
    path: 'tickets-checkout/:id',
    loadChildren: () => import('./tickets-checkout/tickets-checkout.module').then( m => m.TicketsCheckoutPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
