import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { IncidenteService } from '../services/incidente.service';

@Injectable()
export class IncidenteResolver implements Resolve<any> {

  constructor(private incidenteService: IncidenteService) {}

  resolve() {
    //return this.incidenteService.getIncidentes();
  }
}
