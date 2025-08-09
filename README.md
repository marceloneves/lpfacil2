# 🚀 LPFácil2 - Plataforma SaaS para Landing Pages

Uma plataforma completa e moderna para criação de landing pages profissionais, construída com Next.js 15, TypeScript, Tailwind CSS e Firebase.

## ✨ Funcionalidades

### 🎨 **Sistema de Templates**
- 8 templates diferentes (Vendas, Leads, Lançamentos, etc.)
- Filtros por categoria e busca
- Preview de templates com recursos
- Design responsivo e moderno

### 🔐 **Sistema Multi-Tenant**
- Autenticação completa de usuários
- Isolamento de dados por usuário
- Sessões seguras com cookies HTTP-only
- Proteção contra acesso não autorizado

### 📊 **Dashboard Intuitivo**
- Visão geral das landing pages
- Estatísticas de visualizações e conversões
- Ações completas (Editar, Visualizar, Excluir)
- Interface moderna e responsiva

### ✏️ **Editor Visual Moderno**
- **Interface Drag & Drop**: Arraste e solte seções para reorganizar
- **8+ Tipos de Seções**: Hero, Features, Testimonials, Pricing, CTA, FAQ, Contact
- **Customização em Tempo Real**: Cores, textos, espaçamentos e estilos
- **Preview Instantâneo**: Veja mudanças conforme você edita
- **Sidebar Inteligente**: Biblioteca de componentes e painel de customização
- **Configurações Avançadas**: SEO, meta tags e configurações globais

### 🧩 **Biblioteca de Seções**
- **Hero**: Centralizado com CTA, Dividido (texto + imagem)
- **Features**: Grid com ícones, Lista vertical de funcionalidades
- **Social Proof**: Cards de depoimentos com fotos
- **Vendas**: Tabela de preços responsiva, Call-to-action destacado
- **Suporte**: FAQ com accordion, Formulário de contato

### 🛡️ **Segurança**
- Sistema multi-tenant completo
- Verificação de propriedade em todas as operações
- Middleware de autenticação centralizado
- Proteção contra CSRF e ataques

## 🛠️ Tecnologias

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth + Custom Sessions
- **Deployment**: Vercel-ready

## 🚀 Como Executar

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/lpfacil2.git
cd lpfacil2
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o Firebase
Siga o guia completo em [`FIREBASE_SETUP.md`](./FIREBASE_SETUP.md)

### 4. Configure as variáveis de ambiente
```bash
cp env.example .env.local
```

Edite o arquivo `.env.local` com suas credenciais do Firebase:
```env
FIREBASE_PROJECT_ID=seu-projeto-id
FIREBASE_CLIENT_EMAIL=seu-client-email
FIREBASE_PRIVATE_KEY="sua-private-key"
```

### 5. Execute o projeto
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
lpfacil2/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── auth/          # Autenticação
│   │   ├── landing-pages/ # Landing Pages API
│   │   └── users/         # Usuários API
│   ├── components/        # Componentes React
│   ├── dashboard/         # Dashboard do usuário
│   ├── editor/           # Editor de landing pages
│   ├── login/            # Página de login
│   ├── signup/           # Página de cadastro
│   ├── templates/        # Seleção de templates
│   └── globals.css       # Estilos globais
├── lib/                  # Utilitários
│   ├── auth.ts           # Autenticação
│   └── firebaseConfig.ts # Configuração Firebase
├── middleware.ts         # Middleware Next.js
├── CHANGELOG.md         # Histórico de mudanças
└── README.md            # Este arquivo
```

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Verificar código
npm run format       # Formatar código
npm run test:api     # Testar APIs
npm run test:login   # Testar autenticação
npm run setup:firebase # Configurar Firebase
```

## 🎯 Funcionalidades Principais

### **Sistema de Autenticação**
- Login/Logout com sessões seguras
- Cadastro de novos usuários
- Verificação de autenticação em todas as rotas
- Redirecionamento automático

### **Dashboard Multi-Tenant**
- Cada usuário vê apenas suas landing pages
- Estatísticas personalizadas
- Ações completas de gerenciamento
- Interface responsiva

### **Editor de Landing Pages**
- Seleção de templates
- Configuração de título
- Preview em tempo real
- Modo de edição para páginas existentes

### **Sistema de Templates**
- 8 categorias diferentes
- Filtros e busca
- Preview de recursos
- Design moderno

## 🔒 Segurança

- **Multi-Tenant**: Isolamento completo de dados
- **Autenticação**: Sessões seguras com cookies
- **Autorização**: Verificação de propriedade
- **Proteção**: Middleware em todas as rotas
- **Validação**: Dados validados em todas as APIs

## 📊 APIs Disponíveis

### **Autenticação**
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/logout` - Logout de usuário
- `GET /api/auth/verify` - Verificar sessão

### **Landing Pages**
- `GET /api/landing-pages` - Listar (filtrado por usuário)
- `POST /api/landing-pages` - Criar nova
- `PUT /api/landing-pages/[id]` - Atualizar
- `DELETE /api/landing-pages/[id]` - Excluir

### **Usuários**
- `GET /api/users` - Listar usuários
- `POST /api/users` - Criar usuário

## 🚀 Deploy

### **Vercel (Recomendado)**
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### **Outras Plataformas**
- Netlify
- Railway
- Heroku

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

- **Documentação**: Veja [`FIREBASE_SETUP.md`](./FIREBASE_SETUP.md)
- **Issues**: Abra uma issue no GitHub
- **Email**: seu-email@exemplo.com

## 🎉 Agradecimentos

- Next.js Team
- Tailwind CSS
- Firebase
- Vercel

---

**LPFácil2** - Transforme visitantes em clientes com landing pages profissionais! 🚀
