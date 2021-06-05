import { HttpClient, HttpResponse } from '@angular/common/http';
import { REG_CORRECTO, ACT_CORRECTO } from './../../../_shared/var.constants';
import { ITipoDocComprobante } from './../../../_interface/ITipoDocComprobante';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { TipoDocComprobante } from 'src/app/_model/TipoDocComprobante';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TipoDocComprobanteComponent } from '../tipo-doc-comprobante.component';
import { inject } from '@angular/core/testing';
import { STATUS_ENABLE } from 'src/app/_shared/var.constants';
import { TipoDocComprobanteService } from 'src/app/_service/tipo-doc-comprobante.service';

@Component({
  selector: 'app-tipo-doc-comprobante-dialog',
  templateUrl: './tipo-doc-comprobante-dialog.component.html',
  styleUrls: ['./tipo-doc-comprobante-dialog.component.css']
})
export class TipoDocComprobanteDialogComponent implements OnInit {

  formDialog: FormGroup;
  tipoComprobante: TipoDocComprobante;
  op: number;

  constructor(
    private DialogRef: MatDialogRef<TipoDocComprobanteComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: TipoDocComprobante,
    private formBuilder: FormBuilder,
    private tipoComprobanteService: TipoDocComprobanteService

  ) { }

  ngOnInit() {
    this.formDialog = this.formBuilder.group({
      'id': new FormControl(0),
      'codigoSunat': ['', [Validators.required, Validators.maxLength(2)]],
      'descripcion': ['', [Validators.required]],
      'grupoNumeracion': ['', [Validators.required]]
    }
    );

    if (this.data == null) {
      this.op = 1;
    } else {
      this.op = 2;
      this.formDialog.setValue({
        'id': this.data.id,
        'codigoSunat': this.data.codigoSunat,
        'descripcion': this.data.descripcion,
        'grupoNumeracion': this.data.grupoNumeracion
      });
    }
  }

  cerrarDialog() {
    this.DialogRef.close();
  }

  operar() {
    console.log('Operar ...')
    this.tipoComprobante = new TipoDocComprobante();
    if (this.op == 1) {
      this.tipoComprobante.descripcion = this.formDialog.controls.descripcion.value;
      this.tipoComprobante.codigoSunat = this.f.codigoSunat.value;
      this.tipoComprobante.grupoNumeracion = this.f.grupoNumeracion.value;
      this.tipoComprobante.estado = STATUS_ENABLE;

      this.tipoComprobanteService.save(this.tipoComprobante).subscribe((response: ITipoDocComprobante) => {
        this.tipoComprobanteService.findAll().subscribe((response: ITipoDocComprobante) => {
          this.tipoComprobanteService.tipoDocumentoCambio.next(response.data);
          this.tipoComprobanteService.mensajeReactivo.next(REG_CORRECTO)
        });

      });

    } else if (this.op == 2) {
      this.tipoComprobante.id = this.data.id;
      this.tipoComprobante.descripcion = this.f.descripcion.value;
      this.tipoComprobante.codigoSunat = this.f.codigoSunat.value;
      this.tipoComprobante.grupoNumeracion = this.f.grupoNumeracion.value;
      this.tipoComprobante.estado = STATUS_ENABLE;

      this.tipoComprobanteService.update(this.tipoComprobante).subscribe((response: ITipoDocComprobante) => {
        this.tipoComprobanteService.findAll().subscribe((response: ITipoDocComprobante) => {
          this.tipoComprobanteService.tipoDocumentoCambio.next(response.data);
          this.tipoComprobanteService.mensajeReactivo.next(ACT_CORRECTO)
        });
      });

    }
    this.cerrarDialog();
  }

  get f() {
    return this.formDialog.controls;
  }

}
