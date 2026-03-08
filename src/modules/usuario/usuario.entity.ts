import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tarefa } from '../tarefa/tarefa.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  passwordHash: string;

  @OneToMany(() => Tarefa, (tarefa) => tarefa.usuario)
  tarefas: Tarefa[];
}

