import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  @IsNotEmpty()
  @MinLength(3, {
    message: 'El nombre de usuario debe tener al menos 3 caracteres',
  })
  @MaxLength(20, {
    message: 'El nombre de usuario debe tener como máximo 20 caracteres',
  })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
