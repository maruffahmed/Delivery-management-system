import { User } from '@prisma/client';
import { IsString, Length, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto implements User {
  id: number;

  @IsNotEmpty()
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty()
  @IsString({ message: 'Email address must be a string' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsNotEmpty()
  @IsString({ message: 'Phone number must be a string' })
  phone: string;

  @IsNotEmpty()
  @IsString({ message: 'Password must be a string' })
  @Length(6)
  password: string;
}
