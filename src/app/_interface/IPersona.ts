import { ResponseStatus } from '../_model/ResponseStatus';
import { Persona } from '../_model/Persona';

export interface IPersona{
    status : ResponseStatus;
    data : Persona[];
}