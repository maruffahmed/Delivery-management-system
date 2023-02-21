import { User } from '@prisma/client';
import { IsString, Length, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto implements User {
  id: number;

  @IsNotEmpty()
  @IsString({ message: "'name' must be a string" })
  name: string;

  @IsNotEmpty()
  @IsString({ message: "'email' address must be a string" })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsNotEmpty()
  @IsString({ message: "'phone' must be a string" })
  phone: string;

  @IsNotEmpty()
  @IsString({ message: "'password' must be a string" })
  @Length(6)
  password: string;

  @IsNotEmpty()
  @IsString({ message: "'shopName' be a string" })
  shopName: string;

  @IsNotEmpty()
  @IsString({ message: "'shopEmail' be a string" })
  @IsEmail({}, { message: 'Invalid shop email address' })
  shopEmail: string;

  @IsNotEmpty()
  @IsString({ message: "'shopAddress' be a string" })
  shopAddress: string;

  @IsNotEmpty()
  @IsString({ message: "'shopProductType' be a string" })
  shopProductType: string;

  @IsNotEmpty()
  @IsString({ message: "'shopSubProductType' be a string" })
  shopSubProductType: string;
}
