import { TipoDocComprobante } from './../_model/TipoDocComprobante';
import { ResponseStatus } from '../_model/ResponseStatus';

export interface ITipoDocComprobante{
    status : ResponseStatus;
    data : TipoDocComprobante[];
}