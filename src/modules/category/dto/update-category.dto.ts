import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
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
