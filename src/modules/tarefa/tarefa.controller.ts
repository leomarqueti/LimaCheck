import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TarefaService } from './tarefa.service';

@Controller('tarefas')
export class TarefaController {
  constructor(private readonly tarefaService: TarefaService) {}

  @Get()
  findAll() {
    return this.tarefaService.findAll();
  }

  @Post()
  create(@Body() dados: { nome: string; usuario_id: number }) {
    return this.tarefaService.create(dados);
  }

  @Patch(':id/check')
  check(@Param('id') id: string) {
    return this.tarefaService.check(Number(id));
  }
}

