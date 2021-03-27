import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import UserEntity from '../user/user.entity';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({type: LoginDTO})
  @ApiResponse({type: String, status: HttpStatus.OK, description:'Token'})
  async login(@Body() body: LoginDTO): Promise<string> {
    return this.authService.login(body);
  }

  @Post('register')
  @ApiResponse({type: String, status: HttpStatus.CREATED, description: 'Token'})
  async register(@Body() body: RegisterDTO): Promise<string>{
    return this.authService.register(body)
  }
}
