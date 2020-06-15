import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncidentePage } from './incidente.page';
import { IncidenteResolver } from './incidente.resolver';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: IncidentePage,
    resolve: {
      data: IncidenteResolver,
    },
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [IncidentePage],
  providers: [IncidenteResolver],
})
export class IncidentePageModule {}
