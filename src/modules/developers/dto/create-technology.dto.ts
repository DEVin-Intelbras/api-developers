import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateTechnologyDto {
  @IsString()
  @IsNotEmpty()
  public name: string;
}
