import { TipoDocComprobante } from "./TipoDocComprobante";
import { Persona } from "./Persona";
import { Emisor } from "./Emisor";

export class Comprobante{
    private id;
	private tipoDocComprobante: TipoDocComprobante;	
	private persona: Persona;
	private emisor: Emisor;
	private tipoModeda: number;
	private corrSerie: String;
	private corrNumeracion: number;
	private fechaEmision: Date;
	private horaEmision: String;
	private firmaDigital: String;
	private totValventOpeGrav: number;
	private totValventOpeInaf: number;
	private totValventOpeExo: number;
	private totValVentOpeGrat: number;
	private totDesc: number;
	private totSumIgv: number;
	private totSumIsc: number;
	private totSumOtrosTrib: number;
	private tot_desc_global: number;
	private totSumOtrosCarg: number;
	private totImporteVenta: number;
	private codInterFact: String;
	private tipoOper: String;
	private leyenda: String;
	private codRespHash: String;
	private codRespCdr: String;
	private codRespCdrDesc: String;
	private codEnviaSunat: String;
	private codRespEnvio: String;
	private motivoAnulacion: String;
	private estado: String;
}