import { IPersona } from './../_interface/IPersona';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Persona } from '../_model/Persona';
import { HOST } from '../_shared/var.constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  /*Variable  para la programacion reactiva */
  personaCambio = new Subject<Persona[]>();
  /**Variable reactiva para los mensajes de confirmacion */
  mensajeCambio = new Subject<string>();
  url:string = HOST;

  constructor(private http:HttpClient) { }

  
  listar(){
    return this.http.get<IPersona>(`${this.url}/api/persona/findAll`);
  }

  registrar(persona : Persona){
    return this.http.post(`${this.url}/api/persona/save`, persona);
  }

  actualizar(persona : Persona){
    return this.http.put(`${this.url}/api/persona/update`, persona);
  }

  eliminar(idpersona : number){
    return this.http.delete(`${this.url}/api/persona/delete/${idpersona}`);
  }

  buscarPorId(idpersona : number){
    return this.http.get<Persona>(`${this.url}/api/persona/search/${idpersona}`);
  }

  findByFullname(fullname : string){
    return this.http.get<IPersona>(`${this.url}/api/persona/findByFullname/${fullname}`);
  }

  findByDocNumber(numDoc : string){   
    return this.http.get<IPersona>(`${this.url}/api/persona/findByDocNumber/${numDoc}`);
  }

  findByTypeAndDocNumber(typeDoc : string, nrodoc : string){
    console.log('doc '+typeDoc);    
    return this.http.get<IPersona>(`${this.url}/api/persona/findByTypeAndDocNumber/${typeDoc}/${nrodoc}`);
  }
}
