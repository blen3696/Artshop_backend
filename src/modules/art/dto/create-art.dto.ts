import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateArtDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsString()
  imageUrl: string;
}