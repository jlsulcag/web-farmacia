import { TipoDocComprobante } from 'src/app/_model/TipoDocComprobante';
import { HttpClient } from '@angular/common/http';
import { HOST } from 'src/app/_shared/var.constants';
import { Injectable } from '@angular/core';
import { ITipoDocComprobante } from '../_interface/ITipoDocComprobante';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoDocComprobanteService {

  url: string = HOST;
  tipoDocumentoCambio = new Subject<TipoDocComprobante[]>();
  mensajeReactivo = new Subject<string>();

  constructor(
    private http : HttpClient
  ) { }

  findAll(){
    return this.http.get<ITipoDocComprobante>(`${this.url}/api/tipoDocComprobante/findAll`);
  }

  save(data : TipoDocComprobante){
    return this.http.post<ITipoDocComprobante>(`${this.url}/api/tipoDocComprobante/save`, data);
  }

  update(data : TipoDocComprobante){
    return this.http.put<ITipoDocComprobante>(`${this.url}/api/tipoDocComprobante/update`, data);
  }

}
