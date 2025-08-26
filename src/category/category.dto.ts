import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  // @IsOptional()
  // @IsNumber()
  // categoryId: number;

  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser un texto' })
  name: string;

  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @IsString({ message: 'La descripción debe ser un texto' })
  description: string;

  //2
  // @IsOptional()
  // @IsBoolean()
  // visibilityState: boolean;
}

export class UpdateCategoryDto {
  // @IsOptional()
  // @IsNumber()
  // categoryId: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  // @IsOptional()
  // @IsBoolean()
  // visibilityState: boolean;
}
