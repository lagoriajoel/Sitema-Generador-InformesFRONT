import { cursoAlumno } from './cursoAlumno';
import { CursoDto } from "./CursoDto";

export interface Alumno {
  dni: number;
  nombres: string;
  apellido: string;
  email: string;
  curso: cursoAlumno;
}
