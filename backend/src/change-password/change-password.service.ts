import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { MerchantAuthChangePassDto } from './dto/change-pass.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ChangePasswordService {
  readonly saltRounds = process.env.BCRYPT_SALT_OR_ROUNDS;
  constructor(private usersService: UsersService) {}

  // Authenticated Change password
  async authChangePassword(
    data: MerchantAuthChangePassDto,
  ): Promise<Omit<User, 'password'>> {
    const { userID, oldPassword, newPassword, confirmPassword } = data;
    const user = await this.usersService.user({ id: userID });

    const passMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passMatch) {
      throw new NotFoundException('Incorrect old password');
    }

    if (newPassword.length < 6) {
      throw new NotFoundException(
        'Password must be at least 6 characters long',
      );
    }

    if (newPassword !== confirmPassword) {
      throw new NotFoundException(
        'New password and confirm password do not match',
      );
    }

    // Encrypt the password
    const hash = await bcrypt.hash(newPassword, parseInt(this.saltRounds));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...changePassUser } = await this.usersService.updateUser({
      where: { id: userID },
      data: { password: hash },
    });

    if (!changePassUser) {
      throw new NotFoundException('Password change failed');
    }

    return changePassUser;
  }
}
