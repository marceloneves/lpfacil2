#!/usr/bin/env node

/**
 * Script para configurar o Firebase
 * Execute: node setup-firebase.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔥 Configuração do Firebase - LPFácil2\n');

// Verificar se o arquivo .env.local existe
const envPath = path.join(__dirname, '.env.local');
const envExamplePath = path.join(__dirname, 'env.example');

if (!fs.existsSync(envPath)) {
  console.log('📝 Criando arquivo .env.local...');
  
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Arquivo .env.local criado a partir do env.example');
  } else {
    console.log('❌ Arquivo env.example não encontrado');
    process.exit(1);
  }
} else {
  console.log('✅ Arquivo .env.local já existe');
}

console.log('\n📋 Próximos passos:');
console.log('1. Acesse https://console.firebase.google.com');
console.log('2. Crie um novo projeto');
console.log('3. Ative o Firestore Database');
console.log('4. Configure a Service Account');
console.log('5. Baixe o arquivo JSON da chave privada');
console.log('6. Configure as variáveis no arquivo .env.local');
console.log('\n📖 Consulte o arquivo FIREBASE_SETUP.md para instruções detalhadas');

console.log('\n🔧 Para testar após a configuração:');
console.log('npm run dev');
console.log('npm run test:api');

console.log('\n💡 Dica: Nunca commite o arquivo .env.local no repositório!');
