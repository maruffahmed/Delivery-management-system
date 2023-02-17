import { User } from '@prisma/client';
import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto implements User {
  id: number;

  @IsString({ message: 'Name is required' })
  name: string;

  @IsString({ message: 'A unique email is required' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString({ message: 'Phone number is required' })
  phone: string;

  @IsString({ message: 'Password is required' })
  @Length(6)
  password: string;
}
