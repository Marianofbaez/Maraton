import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AthletesService } from './athletes.service';
import { AthletesController } from './athletes.controller';
import { Athlete } from './entities/athlete.entity';
import { City } from '../cities/entities/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Athlete, City])],
  controllers: [AthletesController],
  providers: [AthletesService],
})
export class AthletesModule {}
