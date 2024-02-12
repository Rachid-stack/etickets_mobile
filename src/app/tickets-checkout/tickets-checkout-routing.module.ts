import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketsCheckoutPage } from './tickets-checkout.page';

const routes: Routes = [
  {
    path: '',
    component: TicketsCheckoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsCheckoutPageRoutingModule {}
