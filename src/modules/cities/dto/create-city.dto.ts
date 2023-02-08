import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public state_id: number;
}
