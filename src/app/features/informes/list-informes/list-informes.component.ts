import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Alumno } from 'src/app/core/Entities/alumno';
import { Informes } from 'src/app/core/Entities/informe';
import { AlumnoService } from 'src/app/core/services/alumno.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AddEditInformesComponent } from '../add-edit-informes/add-edit-informes.component';

@Component({
  selector: 'app-list-informes',
  templateUrl: './list-informes.component.html',
  styleUrls: ['./list-informes.component.css']
})
export class ListInformesComponent implements OnInit {
  informes: Informes[] = [];
  alumnos: Alumno[]=[]
  loading: boolean=true
  idCurso = null;
  


  displayedColumns: string[] = ["dni", "nombres", "apellido", "informes"];
  dataSource = new MatTableDataSource(this.alumnos);

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private alumnoService: AlumnoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _routes :ActivatedRoute

  ) {
    this.dataSource = new MatTableDataSource();
    console.log( this._routes.snapshot.paramMap.get('id'));
   this.idCurso =this._routes.snapshot.params['id']
  }

  


  ngOnInit() {
    this.titleService.setTitle("Gestion de Informes - Cursos");
    this.logger.log("Cursos loaded");
    this.notificationService.openSnackBar("Cursos loaded");
    this.dataSource.sort = this.sort;
    this.listarAlumnos();
 

    
  }
  listarAlumnos(): void {
  

    this.alumnoService.listarCurso(this._routes.snapshot.params['id']).subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     
     
     
    })
  }


  generarInforme(id:number){

    const dialogRef = this.dialog.open(AddEditInformesComponent, {
      width: "550px",
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listarAlumnos();
      }
    });
    
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
      this.alumnoService.delete(id).subscribe(() => {
        this.listarAlumnos();
        this.mensajeExito();
      })
    }, 1000);
  }
  mensajeExito() {
    this._snackBar.open('La persona fue eliminada con exito', '', {
      duration: 2000
    });
  }


}
