import { Comprobante } from "./Comprobante";
import { Producto } from "./Producto";

export class ComprobanteDetalle{
    private id: number;
	private comprobante: Comprobante;
	private producto: Producto;
	private unidadMedida: number;
	private tipoAfectacionIgv: number;
	private nroOrdenItem: number;
	private cantItem: number;
	private valorUnitItem: number;
	private precioUnitItem: number;
	private igvItem: number;
	private iscItem: number;
	private descItem: number;
	private valorVentaTotalItem: number;
	private estado: String;
}