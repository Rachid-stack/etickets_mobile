import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeatChoosePage } from './seat-choose.page';

const routes: Routes = [
  {
    path: '',
    component: SeatChoosePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeatChoosePageRoutingModule {}
