import { ELIMINACION_CORRECTA } from './../../_shared/var.constants';
import { TipoDocComprobanteDialogComponent } from './tipo-doc-comprobante-dialog/tipo-doc-comprobante-dialog.component';
import { ITipoDocComprobante } from './../../_interface/ITipoDocComprobante';
import { TipoDocComprobanteService } from './../../_service/tipo-doc-comprobante.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { TipoDocComprobante } from 'src/app/_model/TipoDocComprobante';
import { STATUS_DISABLE } from 'src/app/_shared/var.constants';

@Component({
  selector: 'app-tipo-doc-comprobante',
  templateUrl: './tipo-doc-comprobante.component.html',
  styleUrls: ['./tipo-doc-comprobante.component.css']
})
export class TipoDocComprobanteComponent implements OnInit {

  displayedColumns: string[]=['id', 'descripcion', 'codigoSunat', 'grupoNumeracion', 'estado', 'acciones'];
  dataSource:MatTableDataSource<TipoDocComprobante>;

  @ViewChild(MatSort, {static:true}) sort:MatSort;
  @ViewChild(MatPaginator, {static:true}) paginator : MatPaginator;

  constructor(
    private tipoComprobanteService : TipoDocComprobanteService,
    private dialog : MatDialog,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit() {
    this.listar();

    this.tipoComprobanteService.tipoDocumentoCambio.subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this. paginator;
      this.dataSource.sort = this.sort;
    });

    this.tipoComprobanteService.mensajeReactivo.subscribe(data => {
      this.snackBar.open(data, 'Atención', {
        duration:2000
      });
    });
  }

  openDialog(data?:TipoDocComprobante){
    let temp = data != null ? data : null;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.data = temp;
    this.dialog.open(TipoDocComprobanteDialogComponent, dialogConfig);
  }

  listar(){
    this.tipoComprobanteService.findAll().subscribe((response:ITipoDocComprobante)=>{
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  updateStatus(tipoComprobante : TipoDocComprobante){
    tipoComprobante.estado = STATUS_DISABLE;
    this.tipoComprobanteService.update(tipoComprobante).subscribe((response : ITipoDocComprobante)=>{
      this.tipoComprobanteService.findAll().subscribe((responseData : ITipoDocComprobante)=>{
        this.tipoComprobanteService.tipoDocumentoCambio.next(responseData.data);
        this.tipoComprobanteService.mensajeReactivo.next(ELIMINACION_CORRECTA);
      });
    });
  }

}
