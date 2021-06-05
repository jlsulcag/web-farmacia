import { TipoDocIdentidad } from './../_model/TipoDocIdentidad';
import { ResponseStatus } from './../_model/ResponseStatus';
export interface ITipoDocIdentidad{
    status : ResponseStatus;
    data : TipoDocIdentidad[];
}