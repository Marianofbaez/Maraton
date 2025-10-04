import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Athlete } from '../../athletes/entities/athlete.entity';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Athlete, (a) => a.city)
  athlete: Athlete[];
}
