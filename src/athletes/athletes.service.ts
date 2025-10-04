import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Athlete } from './entities/athlete.entity';
import { CreateAthleteDto } from './dto/create-athlete.dto';
import { UpdateAthleteDto } from './dto/update-athlete.dto';
import { City } from '../cities/entities/city.entity';

@Injectable()
export class AthletesService {
  constructor(
    @InjectRepository(Athlete) private athletes: Repository<Athlete>,
    @InjectRepository(City) private cities: Repository<City>,
  ) {}

  async create(dto: CreateAthleteDto) {
    const exists = await this.athletes.findOne({ where: { dni: dto.dni } });
    if (exists)
      throw new ConflictException('Ya existe este numero de documento'); // corta con 409 ya existe

    const city = await this.cities.findOneBy({ id: dto.cityId });
    if (!city) throw new NotFoundException('No existe la ciudad'); // corta con 404 no existe

    const entity = this.athletes.create({
      dni: dto.dni,
      name: dto.name,
      time: dto.time,
      position: dto.position,
      city, // relación
    });
    const saved = await this.athletes.save(entity);
    return { id: saved.id };
  }

  async findAll() {
    const rows = await this.athletes.find({ relations: ['city'] }); // salida con nombre de ciudad
    return rows.map((a) => ({
      id: a.id,
      dni: a.dni,
      name: a.name,
      time: a.time,
      position: a.position,
      city: a.city?.name ?? null, //Si hay ciudad, devuelve name. Si no, null. Garantiza estabilidad del contrato de salida.
    }));
  }

  async update(id: number, dto: UpdateAthleteDto) {
    const athlete = await this.athletes.findOne({
      where: { id },
      relations: ['city'],
    });
    if (!athlete) throw new NotFoundException('athlete not found'); // corta con 404 no existe

    if (dto.dni && dto.dni !== athlete.dni) {
      const exists = await this.athletes.findOne({ where: { dni: dto.dni } });
      if (exists) throw new ConflictException('dni already exists'); // corta con 409 ya existe
    }

    if (dto.cityId) {
      const city = await this.cities.findOneBy({ id: dto.cityId }); // Verifica si cityId está presente en dto
      if (!city) throw new NotFoundException('city not found'); // corta con 404 no existe
      athlete.city = city; // Actualiza la relación si cityId está presente en dto
    }

    Object.assign(athlete, {
      dni: dto.dni ?? athlete.dni,
      name: dto.name ?? athlete.name,
      time: dto.time ?? athlete.time,
      position: dto.position ?? athlete.position,
    }); // Actualiza solo los campos presentes en dto

    await this.athletes.save(athlete);
    return { id: athlete.id };
  }

  async remove(id: number) {
    const res = await this.athletes.delete(id);
    if (!res.affected) throw new NotFoundException('athlete not found');
  }
}
