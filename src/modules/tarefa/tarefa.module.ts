import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TarefaService } from './tarefa.service';
import { TarefaController } from './tarefa.controller';
import { Tarefa } from './tarefa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tarefa])],
  providers: [TarefaService],
  controllers: [TarefaController],
})
export class TarefaModule {}

export { Tarefa };

