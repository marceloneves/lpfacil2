# LPFácil2 - Plataforma SaaS para Criação de Landing Pages

Plataforma moderna e elegante para criação de landing pages profissionais, construída com Next.js 15, TypeScript, Tailwind CSS e Google Cloud Firestore.

## 🚀 Tecnologias Utilizadas

- **Frontend**: Next.js 15 com App Router
- **Backend**: API Routes do Next.js
- **Banco de Dados**: Google Cloud Firestore
- **Estilização**: Tailwind CSS
- **Linguagem**: TypeScript
- **Linting**: ESLint + Prettier

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Google Cloud Platform
- Projeto Firebase configurado

## 🔧 Configuração

### 1. Clone e Instale as Dependências

```bash
git clone <seu-repositorio>
cd lpfacil2
npm install
```

### 2. Configuração do Firebase

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou use um existente
3. Ative o Firestore Database:
   - Vá para "Firestore Database" no menu lateral
   - Clique em "Criar banco de dados"
   - Escolha "Iniciar no modo de teste" (para desenvolvimento)
   - Selecione a localização mais próxima
4. Configure a Service Account:
   - Vá para "IAM & Admin" > "Service Accounts"
   - Clique em "Criar conta de serviço"
   - Dê um nome como "firebase-admin"
   - Adicione a role "Firebase Admin" ou "Cloud Datastore User"
   - Clique em "Criar e continuar"
   - Clique em "Concluído"
5. Baixe a chave da Service Account:
   - Na lista de Service Accounts, clique nos três pontos da conta criada
   - Selecione "Gerenciar chaves"
   - Clique em "Adicionar chave" > "Criar nova chave"
   - Escolha "JSON" e clique em "Criar"
   - O arquivo será baixado automaticamente

### 3. Configuração das Variáveis de Ambiente

1. Copie o arquivo `env.example` para `.env.local`:
```bash
cp env.example .env.local
```

2. Edite o arquivo `.env.local` com suas credenciais do Firebase:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=seu-projeto-id
FIREBASE_CLIENT_EMAIL=seu-service-account@seu-projeto.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSua chave privada aqui\n-----END PRIVATE KEY-----\n"

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua-chave-secreta-aqui
```

**Importante**: 
- Substitua `seu-projeto-id` pelo ID do seu projeto Firebase
- Substitua `seu-service-account@seu-projeto.iam.gserviceaccount.com` pelo email da sua Service Account
- Substitua `Sua chave privada aqui` pela chave privada do arquivo JSON da Service Account
- A chave privada deve estar entre aspas e com `\n` para quebras de linha

**Exemplo de como extrair as informações do arquivo JSON:**
```json
{
  "project_id": "meu-projeto-123",
  "client_email": "firebase-adminsdk-abc123@meu-projeto-123.iam.gserviceaccount.com",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
}
```

**Para o .env.local:**
```env
FIREBASE_PROJECT_ID=meu-projeto-123
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abc123@meu-projeto-123.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

### 4. Configuração do Firestore

1. No console do Firebase, vá para "Firestore Database"
2. Crie uma coleção chamada `users` (será criada automaticamente quando o primeiro usuário for adicionado)
3. Configure as regras de segurança conforme necessário

## 🏃‍♂️ Executando o Projeto

### Desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

### Build de Produção

```bash
npm run build
npm start
```

### Linting e Formatação

```bash
# Verificar problemas de linting
npm run lint

# Formatar código
npm run format
```

### Configuração do Firebase

```bash
# Configurar Firebase (cria .env.local)
npm run setup:firebase

# Verificar configuração do Firebase
npm run verify:firebase

# Testar se a API está funcionando (requer servidor rodando)
npm run test:api
```

**📖 Guia completo:** Consulte o arquivo [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) para instruções detalhadas.

## 📁 Estrutura do Projeto

```
lpfacil2/
├── app/
│   ├── api/
│   │   └── users/
│   │       └── route.ts          # API para gerenciar usuários
│   ├── components/
│   │   ├── UserForm.tsx          # Formulário para adicionar usuários
│   │   └── UserList.tsx          # Lista de usuários
│   ├── demo/
│   │   └── page.tsx              # Página de demonstração
│   ├── globals.css               # Estilos globais
│   ├── layout.tsx                # Layout raiz
│   └── page.tsx                  # Página principal (Landing Page)
├── lib/
│   └── firebaseConfig.ts         # Configuração do Firebase
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── README.md
├── CHANGELOG.md                  # Histórico de alterações
└── test-api.js                   # Script de teste da API
```

## 🔌 API Endpoints

### GET /api/users
Retorna a lista de todos os usuários.

**Resposta:**
```json
[
  {
    "id": "user-id",
    "name": "João Silva",
    "email": "joao@example.com",
    "age": 25,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### POST /api/users
Cria um novo usuário.

**Corpo da requisição:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "age": 25
}
```

**Resposta:**
```json
{
  "id": "user-id",
  "name": "João Silva",
  "email": "joao@example.com",
  "age": 25,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## 🚀 Deploy no Vercel

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente no painel do Vercel:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
3. Deploy automático será feito a cada push

## 🔒 Segurança

- As credenciais do Firebase são armazenadas como variáveis de ambiente
- Nunca commite o arquivo `.env.local` no repositório
- Use Service Accounts com permissões mínimas necessárias
- Configure regras de segurança adequadas no Firestore

## 🛠️ Funcionalidades

### Landing Page Principal
- ✅ Home moderna e elegante no estilo SaaS
- ✅ Hero section com call-to-action impactante
- ✅ Seção de recursos com ícones profissionais
- ✅ Social proof com logos de empresas
- ✅ Depoimentos de clientes com avaliações
- ✅ Planos de preços com destaque para o mais popular
- ✅ Footer completo e organizado
- ✅ Menu responsivo para mobile
- ✅ Design totalmente responsivo

### Página de Demonstração
- ✅ Editor visual de landing pages
- ✅ Templates categorizados e organizados
- ✅ Preview em tempo real (desktop e mobile)
- ✅ Editor de conteúdo em tempo real
- ✅ Personalização de design
- ✅ Interface intuitiva e profissional

### Sistema Backend
- ✅ API REST completa
- ✅ Integração com Firestore
- ✅ Configuração segura via variáveis de ambiente
- ✅ TypeScript para type safety
- ✅ Tratamento de erros robusto

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📋 Documentação

- [README.md](./README.md) - Este arquivo com instruções completas
- [CHANGELOG.md](./CHANGELOG.md) - Histórico detalhado de todas as alterações
- [env.example](./env.example) - Exemplo de variáveis de ambiente
- [firebase-service-account-example.json](./firebase-service-account-example.json) - Exemplo de configuração do Firebase

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
