import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarefa } from './tarefa.entity';

@Injectable()
export class TarefaService {
  constructor(
    @InjectRepository(Tarefa)
    private readonly tarefaRepo: Repository<Tarefa>,
  ) {}

  async findAll(): Promise<Tarefa[]> {
    return this.tarefaRepo.find({ relations: ['usuario'] });
  }

  async create(dados: { nome: string; usuario_id: number }): Promise<Tarefa> {
    const tarefa = this.tarefaRepo.create(dados);
    return this.tarefaRepo.save(tarefa);
  }

  async check(id: number): Promise<Tarefa> {
    const tarefa = await this.tarefaRepo.findOne({ where: { id } });
    if (!tarefa) {
      throw new NotFoundException(`Tarefa com id ${id} não encontrada`);
    }
    tarefa.isCheck = true;
    return this.tarefaRepo.save(tarefa);
  }
}

