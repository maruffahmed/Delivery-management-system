import { Prisma, PickUpPoints } from '@prisma/client';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreatePickUpPointsDto implements PickUpPoints {
  id: number;

  @IsNotEmpty()
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty()
  @IsString({ message: 'Address must be a string' })
  address: string;

  @IsNotEmpty()
  @IsString({ message: 'Area must be a string' })
  area: string;

  @IsNotEmpty()
  @IsString({ message: 'Phone number must be a string' })
  phone: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  shopsId: number;
}

export class UpdatePickUpPointsDto implements Prisma.PickUpPointsUpdateInput {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Invalid email address' })
  address: string;

  @IsOptional()
  @IsString({ message: 'Area must be a string' })
  area: string;

  @IsOptional()
  @IsString({ message: 'Phone number must be a string' })
  phone: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
