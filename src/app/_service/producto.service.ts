import { IProducto } from './../_interface/IProducto';
import { HOST } from 'src/app/_shared/var.constants';
import { Injectable } from '@angular/core';
import { Producto } from '../_model/Producto';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url : string = HOST;
  objectCambio = new Subject<Producto[]>();
  mensajeReactivo = new Subject<string>();

  constructor(
    private http : HttpClient
  ) { }

  findAll(){
    return this.http.get<IProducto>(`${this.url}/api/producto/findAll`);
  }

  save(data : Producto){
    return this.http.post<IProducto>(`${this.url}/api/producto/save`, data);
  }

  update(data : Producto){
    return this.http.put<IProducto>(`${this.url}/api/producto/update`, data);
  }
}
