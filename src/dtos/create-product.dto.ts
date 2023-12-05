import { IsString, IsNumber, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(350)
  description: string;

  @IsString()
  product_image: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
