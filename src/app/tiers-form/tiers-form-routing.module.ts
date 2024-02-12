import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiersFormPage } from './tiers-form.page';

const routes: Routes = [
  {
    path: '',
    component: TiersFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiersFormPageRoutingModule {}
