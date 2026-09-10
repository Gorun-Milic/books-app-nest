import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import type { Model } from 'mongoose';
import { User, type UserDocument } from '../users/users.schema';
import type { LoginDto } from './dto/login.dto';
import type { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerData: RegisterDto) {
    const existingUser = await this.userModel
      .findOne({ email: registerData.email })
      .exec();

    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    const passwordHash = await bcrypt.hash(registerData.password, 10);
    const user = await this.userModel.create({
      name: registerData.name,
      email: registerData.email,
      passwordHash,
    });

    return this.toPublicUser(user);
  }

  async login(loginData: LoginDto) {
    const user = await this.userModel
      .findOne({ email: loginData.email })
      .select('+passwordHash')
      .exec();

    if (
      !user ||
      !(await bcrypt.compare(loginData.password, user.passwordHash))
    ) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      name: user.name,
    });

    return { accessToken };
  }

  private toPublicUser(user: UserDocument) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
