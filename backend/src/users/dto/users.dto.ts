import { User } from '@prisma/client';
import {
  IsString,
  Length,
  IsEmail,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

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
  @IsString({ message: "'shopName' must be a string" })
  shopName: string;

  @IsNotEmpty()
  @IsString({ message: "'shopEmail' must be a string" })
  @IsEmail({}, { message: 'Invalid shop email address' })
  shopEmail: string;

  @IsNotEmpty()
  @IsString({ message: "'shopAddress' must be a string" })
  shopAddress: string;

  @IsNotEmpty()
  @IsString({ message: "'shopProductType' must be a string" })
  shopProductType: string;

  @IsNotEmpty()
  @IsString({ message: "'shopSubProductType' must be a string" })
  shopSubProductType: string;

  @IsNotEmpty()
  @IsString({ message: "'pickupAddress' must be a string" })
  pickupAddress: string;

  @IsNotEmpty()
  @IsNumber({}, { message: "'pickupAreaId' must be a number" })
  pickupAreaId: number;

  @IsNotEmpty()
  @IsString({ message: "'pickupPhone' must be a string" })
  pickupPhone: string;

  createdAt: Date;
  updatedAt: Date;
}
