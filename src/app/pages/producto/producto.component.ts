import { ELIMINACION_CORRECTA } from './../../_shared/var.constants';
import { IProducto } from './../../_interface/IProducto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { Producto } from 'src/app/_model/Producto';
import { ProductoService } from 'src/app/_service/producto.service';
import { Persona } from 'src/app/_model/Persona';
import { STATUS_DISABLE } from 'src/app/_shared/var.constants';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  displayedColumns: string[]=['id', 'descProd', 'codProd', 'codProdSunat', 'precio', 'cantStock', 'acciones'];
  dataSource:MatTableDataSource<Producto>;

  @ViewChild(MatSort, {static:true}) sort:MatSort;
  @ViewChild(MatPaginator, {static:true}) paginator : MatPaginator;

  constructor(
    private productoService : ProductoService,
    private dialog : MatDialog,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit() {
    this.listar();
  }

  openDialog(data?:Persona){
    let temp = data != null ? data : null;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.data = temp;
    //this.dialog.open(TipoDocComprobanteDialogComponent, dialogConfig);
  }

  listar(){
    this.productoService.findAll().subscribe((response:IProducto)=>{
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  updateStatus(tipoComprobante : Producto){
    tipoComprobante.estado = STATUS_DISABLE;
    this.productoService.update(tipoComprobante).subscribe((response : IProducto)=>{
      this.productoService.findAll().subscribe((responseData : IProducto)=>{
        this.productoService.objectCambio.next(responseData.data);
        this.productoService.mensajeReactivo.next(ELIMINACION_CORRECTA);
      });
    });
  }

}
