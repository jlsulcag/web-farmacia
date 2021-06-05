import { ELIMINACION_CORRECTA, STATUS_DISABLE } from './../../_shared/var.constants';
import { IPersona } from './../../_interface/IPersona';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { Persona } from 'src/app/_model/Persona';
import { PersonaService } from 'src/app/_service/persona.service';
import { PersonadialogComponent } from './personadialog/personadialog.component';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  displayedColumns: String[] = ['id', 'nombres', 'numeroDoc', 'telefono', 'acciones'];
  dataSource: MatTableDataSource<Persona>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private personaService: PersonaService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private dialogRegistrar: MatDialog
  ) { }

  ngOnInit() {
    this.listar();

    this.personaService.personaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  listar() {
    this.personaService.listar().subscribe((response : IPersona ) => {
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.personaService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Atención', {
        duration: 2000
      });
    });
  }

  openDialog(data?: Persona) {
    let personaTemp = data != null ? data : null;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; /** no se cierra el dialogo haciendo clic fuera de el */
    dialogConfig.autoFocus = true; /** Foco en el primer campo de formulario del dialog */
    dialogConfig.width = "50%";
    dialogConfig.data = personaTemp;
    this.dialog.open(PersonadialogComponent, dialogConfig);
  }

  updateStatus(persona: Persona) {
    persona.estado = STATUS_DISABLE;
    this.personaService.actualizar(persona).subscribe(() => {
      this.personaService.listar().subscribe((response : IPersona) => {
        this.personaService.personaCambio.next(response.data);
        this.personaService.mensajeCambio.next(ELIMINACION_CORRECTA);
      });
    });
  }

  findByFullname(fullname: string) {
    console.log('filter filterByNames...' + fullname);
    if (fullname.length >= 1) {
      this.personaService.findByFullname(fullname.trim()).subscribe((response : IPersona) => {
        this.dataSource = new MatTableDataSource(response.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    } else {
      this.listar();
    }

  }

  findByDocNumber(nrodoc: string) {
    console.log('filterByDni...' + nrodoc);
    if (nrodoc.length == 8) {
      this.personaService.findByDocNumber(nrodoc.trim()).subscribe((response : IPersona) => {
        this.dataSource = new MatTableDataSource(response.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }
  }


}
