import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Post()
  create(@Body() dados: { nome: string; passwordHash: string }) {
    return this.usuarioService.create(dados);
  }
}

