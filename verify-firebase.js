#!/usr/bin/env node

/**
 * Script para verificar a configuração do Firebase
 * Execute: node verify-firebase.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuração do Firebase...\n');

// Verificar se o arquivo .env.local existe
const envPath = path.join(__dirname, '.env.local');

if (!fs.existsSync(envPath)) {
  console.log('❌ Arquivo .env.local não encontrado');
  console.log('💡 Execute: npm run setup:firebase');
  process.exit(1);
}

// Ler o arquivo .env.local
const envContent = fs.readFileSync(envPath, 'utf8');

// Verificar variáveis obrigatórias
const requiredVars = [
  'FIREBASE_PROJECT_ID',
  'FIREBASE_CLIENT_EMAIL', 
  'FIREBASE_PRIVATE_KEY'
];

const missingVars = [];

for (const varName of requiredVars) {
  if (!envContent.includes(`${varName}=`)) {
    missingVars.push(varName);
  }
}

if (missingVars.length > 0) {
  console.log('❌ Variáveis do Firebase não configuradas:');
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  console.log('\n💡 Configure as variáveis no arquivo .env.local');
  console.log('📖 Consulte FIREBASE_SETUP.md para instruções');
  process.exit(1);
}

// Verificar se as variáveis têm valores
const lines = envContent.split('\n');
const configuredVars = [];

for (const line of lines) {
  for (const varName of requiredVars) {
    if (line.startsWith(`${varName}=`)) {
      const value = line.split('=')[1];
      if (value && value.trim() !== '') {
        configuredVars.push(varName);
      }
    }
  }
}

if (configuredVars.length === requiredVars.length) {
  console.log('✅ Todas as variáveis do Firebase estão configuradas');
  console.log('\n🔧 Para testar a conexão:');
  console.log('npm run dev');
  console.log('npm run test:api');
} else {
  console.log('⚠️  Algumas variáveis podem estar vazias');
  console.log('💡 Verifique se os valores estão corretos no .env.local');
}

console.log('\n📋 Variáveis encontradas:');
requiredVars.forEach(varName => {
  const hasValue = configuredVars.includes(varName);
  console.log(`   ${hasValue ? '✅' : '❌'} ${varName}`);
});
