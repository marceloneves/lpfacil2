# 🔥 Guia Completo - Configuração do Firebase

## Passo 1: Criar Projeto no Firebase Console

1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Clique em "Criar um projeto"
3. Digite um nome para o projeto (ex: "lpfacil2")
4. Clique em "Continuar"
5. Desative o Google Analytics por enquanto (opcional)
6. Clique em "Criar projeto"

## Passo 2: Ativar o Firestore Database

1. No menu lateral, clique em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha "Iniciar no modo de teste" (para desenvolvimento)
4. Selecione a localização mais próxima (ex: "us-central1")
5. Clique em "Pronto"

## Passo 3: Configurar Service Account

1. No menu lateral, clique em "Configurações do projeto" (ícone de engrenagem)
2. Clique na aba "Contas de serviço"
3. Clique em "Firebase Admin SDK"
4. Clique em "Gerar nova chave privada"
5. Salve o arquivo JSON baixado

## Passo 4: Configurar Variáveis de Ambiente

1. Copie o arquivo `env.example` para `.env.local`:
```bash
cp env.example .env.local
```

2. Abra o arquivo `.env.local` e configure com os dados do seu projeto:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=seu-projeto-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@seu-projeto.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSua chave privada aqui\n-----END PRIVATE KEY-----\n"

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua-chave-secreta-aqui
```

### Como extrair os dados do arquivo JSON:

1. Abra o arquivo JSON baixado
2. Copie os valores:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY`

**Exemplo:**
```json
{
  "type": "service_account",
  "project_id": "lpfacil2-123456",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-abc123@lpfacil2-123456.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-abc123%40lpfacil2-123456.iam.gserviceaccount.com"
}
```

**Para o .env.local:**
```env
FIREBASE_PROJECT_ID=lpfacil2-123456
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abc123@lpfacil2-123456.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

## Passo 5: Testar a Conexão

1. Reinicie o servidor de desenvolvimento:
```bash
npm run dev
```

2. Teste a API:
```bash
npm run test:api
```

## Passo 6: Configurar Regras de Segurança (Opcional)

No console do Firebase, vá para "Firestore Database" > "Regras" e configure:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // Para desenvolvimento
    }
  }
}
```

## 🔧 Solução de Problemas

### Erro: "Firebase não configurado"
- Verifique se o arquivo `.env.local` existe
- Confirme se as variáveis estão corretas
- Reinicie o servidor após configurar

### Erro: "Service account object must contain a string project_id"
- Verifique se `FIREBASE_PROJECT_ID` está configurado
- Confirme se não há espaços extras

### Erro: "Invalid private key"
- Verifique se a chave privada está entre aspas
- Confirme se os `\n` estão presentes

## 📝 Notas Importantes

- **Nunca commite** o arquivo `.env.local` no repositório
- **Mantenha seguro** o arquivo JSON da Service Account
- **Use regras de segurança** apropriadas em produção
- **Configure CORS** se necessário para produção

## ✅ Verificação Final

Para verificar se tudo está funcionando:

1. O servidor deve iniciar sem erros
2. A API `/api/users` deve responder
3. O teste `npm run test:api` deve passar
4. Não deve haver erros no console sobre Firebase
