import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAthleteDto {
  @IsInt()
  @IsPositive()
  dni: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  time: string;

  @IsInt()
  @IsPositive()
  position: number;

  @IsInt()
  @IsPositive()
  cityId: number;
}
