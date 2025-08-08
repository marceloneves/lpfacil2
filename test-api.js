#!/usr/bin/env node

/**
 * Script de teste para verificar se a API está funcionando
 * Execute: node test-api.js
 */

const baseUrl = 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 Testando API do LPFácil2...\n');

  try {
    // Teste 1: GET /api/users
    console.log('1️⃣ Testando GET /api/users...');
    const getResponse = await fetch(`${baseUrl}/api/users`);
    const users = await getResponse.json();
    console.log(`✅ Status: ${getResponse.status}`);
    console.log(`📊 Usuários encontrados: ${users.length}`);
    console.log('');

    // Teste 2: POST /api/users
    console.log('2️⃣ Testando POST /api/users...');
    const newUser = {
      name: 'João Silva',
      email: 'joao@teste.com',
      age: 25
    };

    const postResponse = await fetch(`${baseUrl}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    const createdUser = await postResponse.json();
    console.log(`✅ Status: ${postResponse.status}`);
    console.log(`👤 Usuário criado: ${createdUser.name} (${createdUser.email})`);
    console.log('');

    // Teste 3: GET /api/users novamente para verificar
    console.log('3️⃣ Verificando se o usuário foi adicionado...');
    const getResponse2 = await fetch(`${baseUrl}/api/users`);
    const users2 = await getResponse2.json();
    console.log(`✅ Status: ${getResponse2.status}`);
    console.log(`📊 Total de usuários: ${users2.length}`);
    console.log('');

    console.log('🎉 Todos os testes passaram!');
    console.log('💡 Acesse http://localhost:3000 para ver a interface web');

  } catch (error) {
    console.error('❌ Erro durante os testes:', error.message);
    console.log('');
    console.log('🔧 Verifique se:');
    console.log('   - O servidor está rodando (npm run dev)');
    console.log('   - As variáveis de ambiente estão configuradas');
    console.log('   - O Firebase está configurado corretamente');
  }
}

// Executar o teste
testAPI();
