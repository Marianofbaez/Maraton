
export interface City { id: number; nombre: string; }
export interface Athlete {
  id: number;
  dni: number;
  nombre: string;
  tiempo: string;
  posicion: number;
  ciudad: City;
}
export interface AthleteInput {
  dni: number;
  nombre: string;
  tiempo: string;
  posicion: number;
  ciudadId: number;
}
