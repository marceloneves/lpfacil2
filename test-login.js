#!/usr/bin/env node

/**
 * Script para testar o sistema de login
 * Execute: node test-login.js
 */

const fetch = require('node-fetch');

async function testLogin() {
  console.log('🧪 Testando sistema de login...\n');

  // Primeiro, criar um usuário de teste
  const testUser = {
    name: 'Usuário Teste',
    email: 'teste@exemplo.com',
    password: '123456',
    company: 'Empresa Teste',
    phone: '(11) 99999-9999',
    source: 'test_script',
    status: 'lead'
  };

  try {
    console.log('📤 Criando usuário de teste...');
    const createResponse = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser),
    });

    if (!createResponse.ok) {
      console.log('❌ Erro ao criar usuário de teste');
      return;
    }

    console.log('✅ Usuário de teste criado com sucesso');

    // Agora testar o login
    console.log('\n🔐 Testando login...');
    const loginData = {
      email: 'teste@exemplo.com',
      password: '123456'
    };

    const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const loginResult = await loginResponse.json();

    if (loginResponse.ok && loginResult.success) {
      console.log('✅ Login realizado com sucesso!');
      console.log('👤 Dados do usuário:', loginResult.user);
      console.log('🔑 Token de sessão:', loginResult.token);
    } else {
      console.log('❌ Erro no login:', loginResult.error);
    }

    // Testar verificação de sessão
    console.log('\n🔍 Testando verificação de sessão...');
    const verifyResponse = await fetch('http://localhost:3000/api/auth/verify', {
      headers: {
        'Cookie': `session_token=${loginResult.token}`
      }
    });

    const verifyResult = await verifyResponse.json();

    if (verifyResponse.ok && verifyResult.success) {
      console.log('✅ Sessão verificada com sucesso!');
      console.log('👤 Usuário autenticado:', verifyResult.user);
    } else {
      console.log('❌ Erro na verificação de sessão:', verifyResult.error);
    }

    // Testar logout
    console.log('\n🚪 Testando logout...');
    const logoutResponse = await fetch('http://localhost:3000/api/auth/logout', {
      method: 'POST',
      headers: {
        'Cookie': `session_token=${loginResult.token}`
      }
    });

    const logoutResult = await logoutResponse.json();

    if (logoutResponse.ok && logoutResult.success) {
      console.log('✅ Logout realizado com sucesso!');
    } else {
      console.log('❌ Erro no logout:', logoutResult.error);
    }

  } catch (error) {
    console.log('❌ Erro de conexão:', error.message);
    console.log('💡 Certifique-se de que o servidor está rodando (npm run dev)');
  }

  console.log('\n📋 Para testar a interface:');
  console.log('1. Acesse http://localhost:3000/signup');
  console.log('2. Crie uma conta com sua senha');
  console.log('3. Acesse http://localhost:3000/login');
  console.log('4. Faça login com email e senha criada');
  console.log('5. Você será redirecionado para o dashboard');
}

testLogin();
