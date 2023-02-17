import { Prisma, Shops } from '@prisma/client';
import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateShopsDto implements Shops {
  id: number;

  @IsNotEmpty()
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty()
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsNotEmpty()
  @IsString({ message: 'Address must be a string' })
  address: string;

  @IsNotEmpty()
  @IsString({ message: 'Product type must be a string' })
  productType: string;

  @IsNotEmpty()
  @IsString({ message: 'Sub product must be a string' })
  productSubType: string;

  userId: number;
}

export class UpdateShopsDto implements Prisma.ShopsUpdateInput {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsOptional()
  address: string;
}
