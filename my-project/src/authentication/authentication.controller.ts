import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { AuthenticationService } from './authentication.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import type { AuthUser } from './jwt.strategy';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  register(@Body() registerData: RegisterDto) {
    return this.authenticationService.register(registerData);
  }

  @Post('login')
  login(@Body() loginData: LoginDto) {
    return this.authenticationService.login(loginData);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getCurrentUser(@Req() request: Request & { user: AuthUser }) {
    return request.user;
  }
}
