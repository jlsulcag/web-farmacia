import { REG_CORRECTO, ACT_CORRECTO, STATUS_ENABLE } from './../../../_shared/var.constants';
import { IPersona } from './../../../_interface/IPersona';
import { ITipoDocIdentidad } from './../../../_interface/ITipoDocIdentidad';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { EstadoCivil } from 'src/app/_model/EstadoCivil';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Persona } from 'src/app/_model/Persona';
import { PersonaService } from 'src/app/_service/persona.service';
import { TipodocumentoService } from 'src/app/_service/tipodocumento.service';
import { CorreoValidator } from 'src/app/_util/email.validator';
import { TipoDocIdentidad } from 'src/app/_model/TipoDocIdentidad';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-personadialog',
  templateUrl: './personadialog.component.html',
  styleUrls: ['./personadialog.component.css']
})
export class PersonadialogComponent implements OnInit {
  form: FormGroup;
  persona: Persona;
  tdselected: TipoDocIdentidad;
  //listTipoPersona : TipoPersona[]=[];
  listEstadoCivil: EstadoCivil[] = [];
  listTipoDoc: TipoDocIdentidad[] = [];

  //Variable op determina que operacion se va a realizar 1=Nuevo, 2=Editar
  op: number;

  constructor(private builder: FormBuilder,
    private DialogRef: MatDialogRef<PersonadialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Persona,
    //private tipoPersonaService : TipoPersonaService, 
    private personaService: PersonaService,
    //private estadoCivilService : EstadoCivilService,
    private tipoDocService: TipodocumentoService
  ) { }

  ngOnInit() {
    //builder para trabajo con objetos
    this.form = this.builder.group({
      'id': new FormControl('0'),
      'nombres': new FormControl(''),
      'apePaterno': new FormControl(''),
      'apeMaterno': new FormControl(''),
      'numeroDoc': new FormControl(''),
      'direccion': new FormControl(''),
      'telefono': new FormControl(''),
      'correoElect': new FormControl('', Validators.email),
      //'tipoPersona' : new FormControl(['']),
      //'estadoCivil' : new FormControl(['']),
      'tipoDocIdentidad': new FormControl([''])

    });
    //this.listarTipoPersonas();
    //this.listarEstadoCivil();
    this.listarTipoDoc();
    if (this.data == null) {
      this.op = 1;
    } else {
      this.op = 2;
      this.cargarDatosPersona(this.data);
      this.tdselected = this.data.tipoDocIdentidad;
    }
  }

  operar() {
    this.persona = this.form.value;
    if (this.form.valid) {
      if (this.op == 1) {
        this.persona.estado = STATUS_ENABLE;
        this.personaService.registrar(this.persona).subscribe((response: IPersona) => {
          this.personaService.listar().subscribe((responseData: IPersona) => {
            this.personaService.personaCambio.next(responseData.data);
            this.personaService.mensajeCambio.next(REG_CORRECTO);
          });

        });
      } else if (this.op == 2) {
        this.persona.id = this.data.id;
        this.persona.estado = this.data.estado;
        this.personaService.actualizar(this.persona).subscribe((response: IPersona) => {
          this.personaService.listar().subscribe((responseData: IPersona) => {
            this.personaService.personaCambio.next(responseData.data);
            this.personaService.mensajeCambio.next(ACT_CORRECTO);
          });

        });
      }

      this.cerrarDialog();
    } else {
      this.personaService.mensajeCambio.next("Formulario Invalido");
    }


  }
  /*
  listarTipoPersonas(){
    this.tipoPersonaService.listar().subscribe(data =>{
      //this.listTipoPersona = data
    });
  }

  listarEstadoCivil(){
    this.estadoCivilService.listar().subscribe(data =>{
      this.listEstadoCivil = data;
    });
  }
  */
  listarTipoDoc() {
    this.tipoDocService.listar().subscribe((response: ITipoDocIdentidad) => {
      this.listTipoDoc = response.data;
    });
  }

  cerrarDialog() {
    //this.initForm();
    this.DialogRef.close();
  }

  initForm() {
    this.op = 0;
    this.form.setValue(null);
  }

  cargarDatosPersona(data: Persona) {
    this.form.setValue({

      'id': this.data.id,
      'nombres': this.data.nombres,
      'apePaterno': this.data.apePaterno,
      'apeMaterno': this.data.apeMaterno,
      'numeroDoc': this.data.numeroDoc,
      'direccion': this.data.direccion,
      'telefono': this.data.telefono,
      'correoElect': this.data.correoElect,
      //'tipoPersona' : this.data.tipoPersona,
      //'estadoCivil' : this.data.estadoCivil,
      'tipoDocIdentidad': new FormControl(this.tdselected)

    });

  }

  compareValue(data1: TipoDocIdentidad, data2: TipoDocIdentidad): boolean {
    console.log('Compare');
    console.log('data1' + data1);
    console.log('data2' + data2);
    return data1 && data2 ? data1.id === data2.id : data1 === data2;
  }


}
