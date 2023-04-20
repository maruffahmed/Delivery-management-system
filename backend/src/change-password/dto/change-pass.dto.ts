import { IsString, IsNotEmpty } from 'class-validator';

export class MerchantAuthChangePassDto {
  userID: number;
  @IsNotEmpty()
  @IsString({ message: 'oldPassword must be a string' })
  oldPassword: string;
  @IsNotEmpty()
  @IsString({ message: 'newPassword must be a string' })
  newPassword: string;
  @IsNotEmpty()
  @IsString({ message: 'confirmPassword must be a string' })
  confirmPassword: string;
}
