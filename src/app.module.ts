import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { Usuario } from './modules/usuario/usuario.entity';
import { TarefaModule } from './modules/tarefa/tarefa.module';
import { Tarefa } from './modules/tarefa/tarefa.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...(process.env.DATABASE_URL
        ? {
            url: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false },
          }
        : {
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '123456',
            database: 'tarefas_db',
          }),
      entities: [Usuario, Tarefa],
      synchronize: true,
    }),
    UsuarioModule,
    TarefaModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
