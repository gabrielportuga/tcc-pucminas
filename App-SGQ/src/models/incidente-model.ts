import { NcModel } from './nc-model';
import { InsumoModel } from './insumo-model';
import { IncidenteInsumoNcModel } from './incidenteInsumoNc-model';

export interface IncidenteModel {
  id: number;
  id_usuario_inclusao: number;
  descricao: string;
  data_incidente: string;
  data_inclusao: string;
  data_alteracao: string;
  id_usuario_alteracao: number;
  id_insumo: number;
  id_nc: number;
  nome: string;
  insumos: InsumoModel[];
  ncs: NcModel[];
  incidenteInsumoNc: IncidenteInsumoNcModel[];
}
