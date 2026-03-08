#  LimaCheck

App de gerenciamento de tarefas para oficina mecânica.

Desenvolvido para resolver o problema de tarefas esquecidas ou anotadas em papel — agora qualquer funcionário abre o app, vê o que precisa ser feito e marca quando concluir.

---

##  Funcionalidades

- Login com autenticação JWT
- Lista de tarefas em tempo real com nome do responsável
- Criar nova tarefa
- Marcar tarefa como concluída (some da lista automaticamente)
- Senha criptografada com bcrypt

---

##  Arquitetura

```
React Native (Expo)  →  API NestJS  →  PostgreSQL
```

---

##  Tecnologias

### Backend
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)

### Mobile
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Axios](https://axios-http.com/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

---

##  Como rodar localmente

### Pré-requisitos
- Node.js 18+
- PostgreSQL
- Expo CLI

### Backend

```bash
cd api-tarefas
npm install
```

Crie o banco de dados:
```sql
CREATE DATABASE tarefas_db;
```

Configure a senha do PostgreSQL no `app.module.ts` e rode:

```bash
npm run start:dev
```

API rodando em `http://localhost:3000`

### Mobile

```bash
cd mobile-tarefas
npm install
npx expo start
```

Configure o IP da máquina no arquivo `services/api.ts`:

```typescript
baseURL: 'http://SEU_IP:3000'
```

---

## 📡 Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/auth/login` | Login — retorna token JWT |
| POST | `/usuarios` | Cria usuário |
| GET | `/usuarios` | Lista usuários |
| POST | `/tarefas` | Cria tarefa |
| GET | `/tarefas` | Lista tarefas com usuário |
| PATCH | `/tarefas/:id/check` | Marca tarefa como concluída |

---

##  Autor

Desenvolvido por **Leonardo** — projeto real para uso em oficina mecânica.

Construído do zero como projeto de aprendizado com foco em:
- Arquitetura REST
- Autenticação JWT
- TypeORM e PostgreSQL
- React Native com Expo
