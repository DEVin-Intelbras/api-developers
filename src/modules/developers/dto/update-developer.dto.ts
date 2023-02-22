import { IsBoolean, IsNumber, IsOptional } from '@nestjs/class-validator';

export class UpdateDeveloperDto {
  @IsBoolean()
  @IsOptional()
  public acceptedRemoteWork: boolean;

  @IsNumber()
  @IsOptional()
  public monthsOfExperience: number;

  @IsOptional()
  public technologies: number[];
}
