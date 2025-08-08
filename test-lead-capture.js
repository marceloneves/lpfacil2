#!/usr/bin/env node

/**
 * Script para testar a captura de leads
 * Execute: node test-lead-capture.js
 */

const fetch = require('node-fetch');

async function testLeadCapture() {
  console.log('🧪 Testando captura de leads...\n');

  const testLead = {
    name: 'João Silva',
    email: 'joao.silva@teste.com',
    company: 'TechStart Ltda',
    phone: '(11) 99999-9999',
    source: 'homepage_cta',
    status: 'lead'
  };

  try {
    console.log('📤 Enviando lead de teste...');
    console.log('Dados:', JSON.stringify(testLead, null, 2));

    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testLead),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ Lead criado com sucesso!');
      console.log('Resposta:', JSON.stringify(result, null, 2));
    } else {
      console.log('❌ Erro ao criar lead:');
      console.log('Status:', response.status);
      console.log('Erro:', result);
    }
  } catch (error) {
    console.log('❌ Erro de conexão:', error.message);
    console.log('💡 Certifique-se de que o servidor está rodando (npm run dev)');
  }

  console.log('\n📋 Para testar a interface:');
  console.log('1. Acesse http://localhost:3000');
  console.log('2. Clique em qualquer botão "Começar Grátis"');
  console.log('3. Você será redirecionado para /signup');
  console.log('4. Preencha o formulário na página de cadastro');
  console.log('5. Verifique se o lead foi criado no Firebase');
}

testLeadCapture();
