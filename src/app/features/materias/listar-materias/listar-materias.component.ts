import { Materias } from './../../../core/Entities/materias';
import { Component, OnInit, ViewChild } from '@angular/core';

import { NGXLogger } from 'ngx-logger';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { CursosService } from 'src/app/core/services/cursos/cursos.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MateriasService } from 'src/app/core/services/materias.service';


@Component({
  selector: 'app-listar-materias',
  templateUrl: './listar-materias.component.html',
  styleUrls: ['./listar-materias.component.css']
})
export class ListarMateriasComponent implements OnInit {

  materias: Materias[] = [];
  loading: boolean=true
  idCurso:number=0;

 
  
  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private cursoService: CursosService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _materiasService: MateriasService

  ) {
    
  }

  ngOnInit() {
    this.titleService.setTitle("Gestion de Informes - Cursos");
    this.logger.log("Asignaturas Cargadas");
    this.notificationService.openSnackBar("Asignaturas Cargadas");
   
    this.cargarMaterias();
    
  }
  cargarMaterias(): void {

    this._materiasService.lista().subscribe(data=>{
      this.materias=data
      console.log(this.materias);
    })
  }


  ngAfterViewInit() {
 
  }

  addEditCurso(id?: number) {
   
   

  }

  

  
  mensajeExito() {
    this._snackBar.open('La persona fue eliminada con exito', '', {
      duration: 2000
    });
  }

}
