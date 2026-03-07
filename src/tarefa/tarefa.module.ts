import { Module } from '@nestjs/common';
import { TarefaService } from './tarefa.service';
import { TarefaController } from './tarefa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarefa } from './tarefa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tarefa])],
  providers: [TarefaService],
  controllers: [TarefaController]
})
export class TarefaModule {}
