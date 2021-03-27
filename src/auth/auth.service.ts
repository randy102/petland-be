import { Injectable } from '@nestjs/common';
import { AccountBlockedError, LoginError } from '../commons/auth.exception';
import { HashService } from '../utils/hash/hash.service';
import { UserService } from '../user/user.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import UserEntity, { UserRole } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { classToPlain, plainToClass } from 'class-transformer';

export class AccountPayload {
  _id: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const hashedPassword = this.hashService.create(password);
    const user = await this.userService.findOne({
      email,
      password: hashedPassword,
    });
    if (!user) throw new LoginError();
    return user;
  }

  async checkAccountActive(_id: string): Promise<UserEntity> {
    const user = await this.userService.findOne({ _id });
    if (!user.isActive) throw new AccountBlockedError();
    return user;
  }

  getUserToken(user: UserEntity): string {
    const plainUser = classToPlain(user);
    const payload = plainToClass(AccountPayload, plainUser);
    return this.jwtService.sign(classToPlain(payload));
  }

  async login(data: LoginDTO): Promise<string> {
    const { password, email } = data;
    const user = await this.validateUser(email, password);
    return this.getUserToken(user);
  }

  async register(body: RegisterDTO): Promise<string> {
    const { email } = body;
    await this.userService.checkDuplication({ email });
    const createdUser = await this.userService.save({
      ...body,
      password: this.hashService.create(body.password),
      isActive: true,
      role: UserRole.USER,
    });
    return this.getUserToken(createdUser);
  }
}
