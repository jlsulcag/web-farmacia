import { TipoDocIdentidad } from './TipoDocIdentidad';
export class Persona{
    id: String;
    tipoPersona: number;
    tipoDocIdentidad: TipoDocIdentidad;
    //private estadoCivil: number;
    apePaterno: String;
    apeMaterno: String;
    nombres: String;
    numeroDoc: String;
    fecNacimiento: Date;
    sexo: String;
    direccion: String;
    telefono: String;
    correoElect: String;
    estado: String;
}