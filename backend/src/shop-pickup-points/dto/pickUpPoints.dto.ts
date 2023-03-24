import { Prisma, PickUpPoints } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsNumber,
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
  @IsNumber({}, { message: 'areaId must be a number' })
  areaId: number;

  @IsNotEmpty()
  @IsString({ message: 'Phone number must be a string' })
  phone: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  shopsId: number;
  createdAt: Date;
  updatedAt: Date;
}

export class UpdatePickUpPointsDto implements Prisma.PickUpPointsUpdateInput {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString({ message: 'Address must be a string' })
  address: string;

  @IsOptional()
  @IsNumber({}, { message: 'Area must be a string' })
  areaId: number;

  @IsOptional()
  @IsString({ message: 'Phone number must be a string' })
  phone: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
