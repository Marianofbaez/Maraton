import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CitiesService {
  constructor(@InjectRepository(City) private repo: Repository<City>) {}

  create(dto: CreateCityDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find();
  }

  async update(id: number, dto: UpdateCityDto) {
    const res = await this.repo.update(id, dto);
    if (!res.affected) throw new NotFoundException('city not found');
    return this.repo.findOneBy({ id });
  }

  async remove(id: number) {
    const res = await this.repo.delete(id);
    if (!res.affected) throw new NotFoundException('city not found');
  }
}
