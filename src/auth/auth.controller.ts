import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dados: { nome: string; senha: string }) {
    return this.authService.login(dados.nome, dados.senha);
  }


  
}
