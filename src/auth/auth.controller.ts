import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './auth.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDTO): Promise<string> {
    return this.authService.login(body);
  }

  @Post('register')
  async register(@Body() body: RegisterDTO): Promise<string>{
    return this.authService.register(body)
  }
}
