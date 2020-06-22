import { NcModel } from './nc-model';
import { InsumoModel } from './insumo-model';

export interface IncidenteInsumoNcModel {
  id: number;
  id_incidente: number;
  id_insumo: number;
  id_nc: number;
  id_usuario_nc: number;
  data_nc: string;

  nc: NcModel;
  insumo: InsumoModel;
}
