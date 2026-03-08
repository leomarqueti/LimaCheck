import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariorRepo: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuariorRepo.find();
  }

  async create(dados: {
    nome: string;
    passwordHash: string;
  }): Promise<Usuario> {
    const hash = await bcrypt.hash(dados.passwordHash, 10);
    const usuario = this.usuariorRepo.create({
      nome: dados.nome,
      passwordHash: hash,
    });
    return this.usuariorRepo.save(usuario);
  }

  async findByNome(nome: string): Promise<Usuario | null> {
    return this.usuariorRepo.findOne({ where: { nome } });
  }
}

