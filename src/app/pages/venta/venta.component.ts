import { Producto } from './../../_model/Producto';
import { IProducto } from './../../_interface/IProducto';
import { ProductoService } from './../../_service/producto.service';
import { IPersona } from './../../_interface/IPersona';
import { PersonaService } from 'src/app/_service/persona.service';
import { ITipoDocComprobante } from './../../_interface/ITipoDocComprobante';
import { TipoDocComprobanteService } from 'src/app/_service/tipo-doc-comprobante.service';
import { TipoDocComprobante } from 'src/app/_model/TipoDocComprobante';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/_model/Persona';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  form : FormGroup;
  listTipoCom: TipoDocComprobante[] = [];
  listPersonas : Persona[] = [];
  listProductos : Producto[] = [];

  tipoComprobanteSelect : TipoDocComprobante;
  personaSelect : Persona;
  cantidad : number;

  constructor(
    private builder: FormBuilder,
    private tipoDocComprobanteService : TipoDocComprobanteService,
    private personaService : PersonaService,
    private productoService : ProductoService
  ) { }

  ngOnInit() {
    this.form = this.builder.group(
      {
        'id' : new FormControl('0'),
        'tipoDocComprobante' : new FormControl(['']),
        'corrSerie' : new FormControl(['']),
        'corrNumeracion' : new FormControl(['']),
        'persona' : new FormControl(['']),
        'producto' : new FormControl(['']),
        'cantidad' : new FormControl()
      }
    );
    this.listarTipoComprobante();
    this.listarPersonas();
    this.listarProductos();
  }

  listarTipoComprobante(){
    this.tipoDocComprobanteService.findAll().subscribe((response:ITipoDocComprobante)=>{
      this.listTipoCom = response.data;
    });
  }

  listarPersonas(){
    this.personaService.listar().subscribe((response : IPersona)=>{
      this.listPersonas = response.data;
    });
  }

  listarProductos(){
    this.productoService.findAll().subscribe((response : IProducto)=>{
      this.listProductos = response.data;
    });
  }

}
