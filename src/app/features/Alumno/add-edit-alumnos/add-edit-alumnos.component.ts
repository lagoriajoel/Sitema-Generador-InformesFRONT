import { CursoDto } from 'src/app/core/Entities/CursoDto';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alumno } from 'src/app/core/Entities/alumno';
import { AlumnoService } from 'src/app/core/services/alumno.service';
import { CursosService } from 'src/app/core/services/cursos/cursos.service';
import { cursoAlumno } from 'src/app/core/Entities/cursoAlumno';


@Component({
  selector: 'app-add-edit-alumnos',
  templateUrl: './add-edit-alumnos.component.html',
  styleUrls: ['./add-edit-alumnos.component.css']
})
export class AddEditAlumnosComponent implements OnInit {

  form: FormGroup;

  
 
  loading: boolean = false;
  operacion: string = 'Agregar ';
  id: number | undefined;
  idCurso: number | undefined;
  cursoAlumno!: cursoAlumno;

  constructor(public dialogRef: MatDialogRef<AddEditAlumnosComponent>,
    private fb: FormBuilder, private _alumnoService: AlumnoService,
    private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any,
    private _cursoService: CursosService) {
   
    this.form = this.fb.group({
      dni: ['', [Validators.required, Validators.maxLength(10)]],
      nombres: ['', Validators.required],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required]],
      
      

      
    })

    this.id = data.id;
    this.idCurso= data.idCurso;
  
    
   

  }

  ngOnInit(): void {
    this.esEditar(this.id);
   
  }

  esEditar(id: number | undefined) {
    if (id !== undefined) {
      this.operacion = 'Editar ';
      this.getCurso(id);
    }
  }

  getCurso(id: number) {
    this._alumnoService.detail(id).subscribe(data => {
      this.form.setValue({
        dni: data.dni,
        nombres: data.nombres,
        apellido: data.apellido,
        email: data.email,
        
       
      })
    })
  }

 

  cancelar() {
    this.dialogRef.close(false);
  }

  addEditAlumno() {

    if (this.form.invalid) {
      return;
    }
    const cursoAlumno: cursoAlumno= {
      idCurso: this.data.idCurso
    }
   
    const alumno: Alumno = {
      dni: this.form.value.dni,
      nombres: this.form.value.nombres,
      apellido: this.form.value.apellido,
      email: this.form.value.email,
      curso: cursoAlumno

    }

     this.loading=true
    if (this.id == undefined) {

      // Es agregar
      this._alumnoService.save(alumno).subscribe(() => {
        this.mensajeExito('agregada');
        this.dialogRef.close(true)
      })

    } else {

      // Es editar
      this._alumnoService.update(this.id, alumno).subscribe(data => {
        this.mensajeExito('actualizada');
        this.dialogRef.close(true)

      })
    }
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`La persona fue ${operacion} con exito`, '', {
      duration: 2000
    });
  }


}
