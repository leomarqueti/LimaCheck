import { Tarefa } from 'src/tarefa/tarefa.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
