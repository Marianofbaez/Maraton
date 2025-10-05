import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { City } from '../../cities/entities/city.entity';

@Entity('athletes')
export class Athlete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true })
  dni: number;

  @Column()
  name: string;

  @Column({ type: 'varchar', length: 50 })
  time: string;

  @Column({ type: 'int' })
  position: number;

  @ManyToOne(() => City, (c) => c.athletes, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'cityId' })
  city: City;

  @RelationId((athlete: Athlete) => athlete.city)
  cityId: number;
}
