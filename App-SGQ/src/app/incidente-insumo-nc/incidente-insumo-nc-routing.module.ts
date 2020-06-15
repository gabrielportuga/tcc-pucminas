import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidenteInsumoNcPage } from './incidente-insumo-nc.page';

const routes: Routes = [
  {
    path: '',
    component: IncidenteInsumoNcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidenteInsumoNcPageRoutingModule {}
