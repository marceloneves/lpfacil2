#!/usr/bin/env node

/**
 * Script para inicializar dados de demonstração
 * Cria um usuário de teste e algumas landing pages de exemplo
 */

async function initDemoData() {
  console.log('🚀 Inicializando dados de demonstração...\n');

  try {
    // 1. Criar usuário de teste
    console.log('👤 Criando usuário de demonstração...');
    const userResponse = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Demo User',
        email: 'demo@lpfacil.com',
        company: 'LPFácil Demo',
        phone: '(11) 99999-9999',
        password: 'demo123',
        source: 'demo'
      }),
    });

    if (!userResponse.ok) {
      const error = await userResponse.text();
      if (error.includes('Email já está em uso')) {
        console.log('ℹ️  Usuário demo já existe');
      } else {
        console.log('❌ Erro ao criar usuário:', error);
        return;
      }
    } else {
      console.log('✅ Usuário demo criado: demo@lpfacil.com (senha: demo123)');
    }

    // 2. Fazer login
    const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'demo@lpfacil.com',
        password: 'demo123'
      }),
    });

    if (!loginResponse.ok) {
      console.log('❌ Erro no login');
      return;
    }

    const setCookieHeader = loginResponse.headers.get('set-cookie');
    const sessionToken = setCookieHeader?.split('session_token=')[1]?.split(';')[0];

    if (!sessionToken) {
      console.log('❌ Token de sessão não encontrado');
      return;
    }

    // 3. Criar landing pages de exemplo
    const demoPages = [
      {
        title: 'Landing Page de E-commerce',
        template: 'ecommerce',
      },
      {
        title: 'Captura de Leads B2B',
        template: 'lead-capture',
      },
      {
        title: 'Evento Online - Webinar',
        template: 'event',
      },
      {
        title: 'Aplicativo Mobile',
        template: 'app',
      }
    ];

    console.log('\n📄 Criando landing pages de exemplo...');
    for (const page of demoPages) {
      const response = await fetch('http://localhost:3000/api/landing-pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `session_token=${sessionToken}`
        },
        body: JSON.stringify(page),
      });

      if (response.ok) {
        console.log(`✅ Criada: ${page.title}`);
      } else {
        console.log(`❌ Erro ao criar: ${page.title}`);
      }
    }

    console.log('\n🎉 Dados de demonstração inicializados com sucesso!');
    console.log('\n📋 Para acessar:');
    console.log('1. Vá para http://localhost:3000/login');
    console.log('2. Email: demo@lpfacil.com');
    console.log('3. Senha: demo123');

  } catch (error) {
    console.error('❌ Erro durante inicialização:', error.message);
  }
}

if (require.main === module) {
  initDemoData();
}

module.exports = { initDemoData };
