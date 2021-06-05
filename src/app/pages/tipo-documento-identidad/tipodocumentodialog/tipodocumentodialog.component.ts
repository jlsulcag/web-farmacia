import { ITipoDocIdentidad } from './../../../_interface/ITipoDocIdentidad';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TipodocumentoService } from 'src/app/_service/tipodocumento.service';
import { TipoDocumentoIdentidadComponent } from '../tipo-documento-identidad.component';
import { STATUS_ENABLE, STATUS_DISABLE } from 'src/app/_shared/var.constants';
import { TipoDocIdentidad } from 'src/app/_model/TipoDocIdentidad';

@Component({
  selector: 'app-tipodocumentodialog',
  templateUrl: './tipodocumentodialog.component.html',
  styleUrls: ['./tipodocumentodialog.component.css']
})
export class TipodocumentodialogComponent implements OnInit {
  formDialog : FormGroup;
  tipoDoc : TipoDocIdentidad;
  //Variable op determina que operacion se va a realizar 1=Nuevo, 2=Editar
  op:number;
  statusTemp:boolean=false;
  prueba : boolean = false;

  constructor(private DialogRef : MatDialogRef<TipoDocumentoIdentidadComponent>, @Inject(MAT_DIALOG_DATA) private data: TipoDocIdentidad,
  private tipoDocumentoService : TipodocumentoService) { }

  ngOnInit() {
    this.formDialog = new FormGroup({
      'id' : new FormControl(0),
      'abreviatura' : new FormControl(''),
      'descripcion' : new FormControl(''),
      'codigoSunat' : new FormControl('')
    });

    if(this.data == null){     
      this.op = 1;
    }else{
      this.op = 2;
      this.formDialog.setValue({
        'id' : this.data.id,
        'abreviatura' : this.data.abreviatura,
        'descripcion' : this.data.descripcion,
        'codigoSunat' : this.data.codigoSunat,
      });
    }
    
  }

  operar(){
    this.tipoDoc = new TipoDocIdentidad();
    if(this.op == 1){      
      this.tipoDoc.abreviatura = this.formDialog.value['abreviatura'];
      this.tipoDoc.descripcion = this.formDialog.value['descripcion'];
      this.tipoDoc.codigoSunat = this.formDialog.value['codigoSunat'];
      this.tipoDoc.estado = STATUS_ENABLE;
      this.tipoDocumentoService.registrar(this.tipoDoc).subscribe(data =>{
        this.tipoDocumentoService.listar().subscribe((response: ITipoDocIdentidad) =>{
          this.tipoDocumentoService.tipoDocumentoCambio.next(response.data);
          this.tipoDocumentoService.mensajeReactivo.next('Registro Correcto');
        });
      });
    }else if(this.op == 2){ 
      this.tipoDoc.id = this.data.id;
      this.tipoDoc.abreviatura = this.formDialog.value['abreviatura'];
      this.tipoDoc.descripcion = this.formDialog.value['descripcion'];
      this.tipoDoc.codigoSunat = this.formDialog.value['codigoSunat'];
      this.tipoDocumentoService.editar(this.tipoDoc).subscribe(data =>{
        this.tipoDocumentoService.listar().subscribe((response:ITipoDocIdentidad) =>{
          this.tipoDocumentoService.tipoDocumentoCambio.next(response.data);
          this.tipoDocumentoService.mensajeReactivo.next('Actualización Correcta');
        });
      });
    }
    this.cerrarDialog();
  }

  cerrarDialog(){
    this.initForm();
    this.DialogRef.close();
  }

  initForm(){
    this.op = 0;
    this.formDialog.setValue({
      'id' : null,
      'abreviatura' : '',
      'descripcion' : '',
      'codigoSunat' : ''
    });
  }

}
