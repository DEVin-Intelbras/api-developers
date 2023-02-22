import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from '@nestjs/class-validator';

export class CreateDeveloperDto {
  @IsBoolean()
  @IsOptional()
  public acceptedRemoteWork: boolean;

  @IsNumber()
  @IsNotEmpty()
  public monthsOfExperience: number;

  @IsNumber()
  @IsNotEmpty()
  public user_id: number;

  @IsNotEmpty()
  public technologies: number[];
}
