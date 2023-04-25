import { FieldPackageHandler, Prisma, User } from '@prisma/client';
import {
  IsString,
  Length,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

class CreateFieldPackageHandler implements FieldPackageHandler {
  id: number;
  @IsNotEmpty()
  @IsString({ message: 'address must be a string' })
  address: string;
  @IsNotEmpty()
  @IsNumber({}, { message: "'areaId' must be a number" })
  areaId: number;
  @IsNotEmpty()
  @IsNumber({}, { message: "'roleId' must be a number" })
  roleId: number;

  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export class CreateFieldPackageHandlerDto
  extends CreateFieldPackageHandler
  implements User
{
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

  fieldPackageHandlerId: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class UpdateFieldPackageHandlerDto {
  @IsOptional()
  @IsString({ message: 'address must be a string' })
  address: string;
  @IsOptional()
  @IsNumber({}, { message: "'areaId' must be a number" })
  areaId: number;
  @IsOptional()
  @IsNumber({}, { message: "'roleId' must be a number" })
  roleId: number;

  @IsOptional()
  @IsString({ message: "'name' must be a string" })
  name: string;

  @IsOptional()
  @IsString({ message: "'email' address must be a string" })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsOptional()
  @IsString({ message: "'phone' must be a string" })
  phone: string;

  @IsOptional()
  @IsString({ message: "'password' must be a string" })
  @Length(6)
  password: string;
}
