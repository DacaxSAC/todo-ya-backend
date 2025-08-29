import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategory {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser un texto' })
  name: string;

  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @IsString({ message: 'La descripción debe ser un texto' })
  description: string;

  // visibilityState: boolean;
}
