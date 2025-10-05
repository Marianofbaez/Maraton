import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitiesModule } from './cities/cities.module';
import { AthletesModule } from './athletes/athletes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'Mariano1992',
      database: 'apiMarathon',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    CitiesModule,
    AthletesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
