
export interface City { id: number; name: string; }
export interface Athlete {
  id: number;
  dni: number;
  name: string;
  time: string;
  position: number;
  city: City;
}
export interface AthleteInput {
  dni: number;
  name: string;
  time: string;
  position: number;
  cityId: number;
}
