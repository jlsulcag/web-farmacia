import { ITipoDocIdentidad } from './../_interface/ITipoDocIdentidad';

import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constants';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { TipoDocIdentidad } from '../_model/TipoDocIdentidad';

@Injectable({
  providedIn: 'root'
})
export class TipodocumentoService {
  url : string = HOST;
  tipoDocumentoCambio = new Subject<TipoDocIdentidad[]>();
  mensajeReactivo = new Subject<string>();

  constructor(private http : HttpClient) {}

  listar(){    
    return this.http.get<ITipoDocIdentidad>(`${this.url}/api/tipoDocIdentidad/findAll`);
  }

  registrar(obj:TipoDocIdentidad){
    return this.http.post(`${this.url}/api/tipoDocIdentidad/save`, obj);
  }

  editar(obj:TipoDocIdentidad){
    return this.http.put(`${this.url}/api/tipoDocIdentidad/update`, obj);
  }

  eliminar(id:number){   
    return this.http.delete(`${this.url}/api/tipoDocIdentidad/delete/${id}`);
  }

  updateStatus(obj:TipoDocIdentidad){ 
    console.log(obj);  
    return this.http.put(`${this.url}/api/tipoDocIdentidad/updateStatus`, obj);
  }
}
