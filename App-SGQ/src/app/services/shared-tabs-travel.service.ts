import { IncidenteModel } from 'src/models/incidente-model';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class SharedTabsIncidente {
  public tabIncidente: IncidenteModel;
}
