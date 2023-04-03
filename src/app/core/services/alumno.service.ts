import { AboutModule } from './../../features/about/about.module';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../Entities/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {


  AlumnoURL = 'http://localhost:8001/alumnos/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Alumno[]> {
    return this.httpClient.get<Alumno[]>(this.AlumnoURL + 'list');
  }

  public listarCurso(id: number): Observable<Alumno[]> {
    return this.httpClient.get<Alumno[]>(this.AlumnoURL + `listOfCurso/${id}` );
  }

  public detail(id: number): Observable<Alumno> {
    return this.httpClient.get<Alumno>(this.AlumnoURL + `list/${id}`);
  }

 
  public save(alumno: Alumno): Observable<any> {
    return this.httpClient.post<any>(this.AlumnoURL + 'save', alumno);
  }

  public update(id: number, alumno: Alumno): Observable<any> {
    return this.httpClient.put<any>(this.AlumnoURL + `update/${id}`, alumno);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.AlumnoURL + `delete/${id}`);
  }
}
