import { IncidenteInsumoNcModel } from './incidenteInsumoNc-model';


export interface IncidenteModel {
  id: number;
  id_usuario_inclusao: number;
  descricao: string;
  data_incidente: string;
  data_inclusao: string;
  data_alteracao: string;
  id_usuario_alteracao: number;
  incidenteInsumoNc: IncidenteInsumoNcModel[];
}
