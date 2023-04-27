import { Parcel, Prisma } from '@prisma/client';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateParcelDto implements Parcel {
  id: number;

  @IsNotEmpty()
  @IsString({ message: "'customerName' must be a string" })
  customerName: string;
  @IsNotEmpty()
  @IsString({ message: "'customerPhone' must be a string" })
  customerPhone: string;
  @IsNotEmpty()
  @IsString({ message: "'customerAddress' must be a string" })
  customerAddress: string;
  @IsNotEmpty()
  @IsNumber({}, { message: "'parcelWeight' must be a number" })
  parcelWeight: number;
  @IsNotEmpty()
  @IsNumber({}, { message: "'parcelCashCollection' must be a number" })
  parcelCashCollection: number;
  @IsNotEmpty()
  @IsString({ message: "'parcelProductType' must be a string" })
  parcelProductType: string;
  @IsNotEmpty()
  @IsNumber({}, { message: "'parcelProductCategoriesId' must be a number" })
  parcelProductCategoriesId: number;
  @IsNotEmpty()
  @IsNumber({}, { message: "'parcelPickUpId' must be a number" })
  parcelPickUpId: number;
  @IsNotEmpty()
  @IsNumber({}, { message: "'parcelStatusId' must be a number" })
  parcelStatusId: number;
  @IsNotEmpty()
  @IsNumber({}, { message: "'parcelPrice' must be a number" })
  parcelPrice: number;
  @IsNotEmpty()
  @IsNumber({}, { message: "'parcelCharge' must be a number" })
  parcelCharge: number;
  @IsNotEmpty()
  @IsNumber({}, { message: "'shopsId' must be a number" })
  shopsId: number;
  @IsNotEmpty()
  @IsNumber({}, { message: "'parcelDeliveryAreaId' must be a number" })
  parcelDeliveryAreaId: number;

  parcelUserId: number;
  parcelExtraInformation: string;
  customerParcelInvoiceId: string;
  fieldPackageHandlerId: number;
  parcelNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UpdateParcelDto implements Prisma.ParcelUpdateInput {
  @IsOptional()
  @IsString({ message: "'customerName' must be a string" })
  customerName: string;
  @IsOptional()
  @IsString({ message: "'customerPhone' must be a string" })
  customerPhone: string;
  @IsOptional()
  @IsString({ message: "'customerAddress' must be a string" })
  customerAddress: string;
}
