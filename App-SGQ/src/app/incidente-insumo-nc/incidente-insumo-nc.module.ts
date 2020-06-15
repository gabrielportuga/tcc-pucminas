import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncidenteInsumoNcPageRoutingModule } from './incidente-insumo-nc-routing.module';

import { IncidenteInsumoNcPage } from './incidente-insumo-nc.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IncidenteInsumoNcPageRoutingModule,
    Ionic4DatepickerModule,
    IonicSelectableModule
  ],
  declarations: [IncidenteInsumoNcPage]
})
export class IncidenteInsumoNcPageModule {}
