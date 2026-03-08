import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Entity()
export class Tarefa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ default: false })
  isCheck: boolean;

  @Column()
  usuario_id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.tarefas)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;
}

