import { ITipoDocIdentidad } from './../../_interface/ITipoDocIdentidad';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { TipodocumentoService } from 'src/app/_service/tipodocumento.service';
import { TipodocumentodialogComponent } from './tipodocumentodialog/tipodocumentodialog.component';
import { TipoDocIdentidad } from 'src/app/_model/TipoDocIdentidad';
import { STATUS_DISABLE } from 'src/app/_shared/var.constants';

@Component({
  selector: 'app-tipo-documento-identidad',
  templateUrl: './tipo-documento-identidad.component.html',
  styleUrls: ['./tipo-documento-identidad.component.css']
})
export class TipoDocumentoIdentidadComponent implements OnInit {
  displayedColumns: string[]=['id', 'abreviatura', 'descripcion', 'codigoSunat', 'estado', 'acciones'];
  dataSource:MatTableDataSource<TipoDocIdentidad>;

  @ViewChild(MatSort, {static:true}) sort:MatSort;
  @ViewChild(MatPaginator, {static:true}) paginator : MatPaginator;

  constructor(private tipoDocumentoService : TipodocumentoService, private dialog : MatDialog,
    private snackBar:MatSnackBar) {}

  ngOnInit() {
    this.listar();
    
    this.tipoDocumentoService.tipoDocumentoCambio.subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this. paginator;
      this.dataSource.sort = this.sort;
    });

    this.tipoDocumentoService.mensajeReactivo.subscribe(data => {
      this.snackBar.open(data, 'Atención', {
        duration:2000
      });
    });
    
  }

  listar(){
    this.tipoDocumentoService.listar().subscribe((response: ITipoDocIdentidad) =>{
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialogCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; /** no se cierra el dialogo haciendo clic fuera de el */
    dialogConfig.autoFocus = true; /** Foco en el primer campo de formulario del dialog */
    dialogConfig.width = "40%";
    this.dialog.open(TipodocumentodialogComponent, dialogConfig);
  }

  openDialogUpdate(tipoDoc : TipoDocIdentidad){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; /** no se cierra el dialogo haciendo clic fuera de el */
    dialogConfig.autoFocus = true; /** Foco en el primer campo de formulario del dialog */
    dialogConfig.width = "50%";
    dialogConfig.data = tipoDoc;
    this.dialog.open(TipodocumentodialogComponent, dialogConfig);
  }
  
  delete(tipoDoc:TipoDocIdentidad){
    tipoDoc.estado = STATUS_DISABLE;
    this.tipoDocumentoService.updateStatus(tipoDoc).subscribe(()=>{
      this.tipoDocumentoService.listar().subscribe((response:ITipoDocIdentidad)=>{
        this.tipoDocumentoService.tipoDocumentoCambio.next(response.data);
        this.tipoDocumentoService.mensajeReactivo.next('Eliminacion correcta');
      });
    });
  }

}
