import { Router } from '@angular/router';
import { AddEditCursoComponent } from "./../add-edit-curso/add-edit-curso.component";
import { Subscription } from "rxjs";

import { CursosService } from "./../../../../core/services/cursos/cursos.service";


import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NGXLogger } from "ngx-logger";
import { Title } from "@angular/platform-browser";
import { NotificationService } from "src/app/core/services/notification.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialogConfig, MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CursoDto } from "src/app/core/Entities/CursoDto";

@Component({
  selector: "app-listar",
  templateUrl: "./listar.component.html",
  styleUrls: ["./listar.component.css"],
})
export class ListarComponent implements OnInit {
  cursos: CursoDto[] = [];
  loading: boolean=true
  idCurso:number=0;

  displayedColumns: string[] = ["Año", "Division", "Ciclo Lectivo", "acciones", "addAlumno","Informes"];
  dataSource = new MatTableDataSource(this.cursos);

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private cursoService: CursosService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router

  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.titleService.setTitle("Gestion de Informes - Cursos");
    this.logger.log("Cursos loaded");
    this.notificationService.openSnackBar("Cursos loaded");
    this.dataSource.sort = this.sort;
    this.cargarCurso();
    
  }
  cargarCurso(): void {
    this.cursoService.lista().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     
    })
    
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addEditCurso(id?: number) {
    const dialogRef = this.dialog.open(AddEditCursoComponent, {
      width: "550px",
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarCurso();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCurso(id: number) {
    
    this.loading = true;

    setTimeout(() => {
      this.cursoService.delete(id).subscribe(() => {
        this.cargarCurso();
        this.mensajeExito();
      })
    }, 1000);
  }
  mensajeExito() {
    this._snackBar.open('La persona fue eliminada con exito', '', {
      duration: 2000
    });
  }

  addAlumno(id: number){
   this.idCurso=id

    this.router.navigate(["/alumnos/listar/", this.idCurso]);

  }

  informes(idCurso: number){
    this.idCurso=idCurso;
    this.router.navigate(["/materias/listar/", this.idCurso]);
  }

}
