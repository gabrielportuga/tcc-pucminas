import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncidentCrudPageRoutingModule } from './incidente-crud-routing.module';

import { IncidentCrudPage } from './incidente-crud.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IncidentCrudPageRoutingModule,
    Ionic4DatepickerModule,
    IonicSelectableModule
  ],
  declarations: [IncidentCrudPage]
})
export class IncidentCrudPageModule {}
