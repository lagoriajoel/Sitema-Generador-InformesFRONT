import { contenido } from "./Contenido";
import { CursoDto } from "./CursoDto";
import { Alumno } from "./alumno";

export interface Informes {
    anio: string;
    descripcion: string;
    curso: CursoDto
    alumno: Alumno
    contenido: contenido []
}