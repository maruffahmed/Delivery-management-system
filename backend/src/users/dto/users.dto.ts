import { User } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateUserDto implements User {
  id: number;

  @IsString({ message: 'A unique email is required' })
  email: string;

  @IsString({ message: 'Name is required' })
  name: string;

  @IsString({ message: 'Password is required' })
  password: string;
}
