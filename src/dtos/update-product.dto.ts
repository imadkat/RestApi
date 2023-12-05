import { IsString, IsNumber, MaxLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MaxLength(80)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(350)
  description: string;

  @IsString()
  @IsOptional()
  product_image: string;

  @IsNumber()
  @IsOptional()
  price: number;
}
