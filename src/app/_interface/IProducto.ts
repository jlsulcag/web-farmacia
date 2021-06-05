import { ResponseStatus } from '../_model/ResponseStatus';
import { Producto } from '../_model/Producto';

export interface IProducto{
    status : ResponseStatus;
    data : Producto[];
}