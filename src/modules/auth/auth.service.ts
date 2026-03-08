import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async login(nome: string, senha: string) {
    const usuario = await this.usuarioService.findByNome(nome);

    if (!usuario) {
      throw new UnauthorizedException('Usuario e senha invalida!');
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.passwordHash);

    if (!senhaCorreta) {
      throw new UnauthorizedException('Usuario ou senha incorreta!');
    }

    const payload = { sub: usuario.id, nome: usuario.nome };
    return {
      acess_token: this.jwtService.sign(payload),
    };
  }
}

