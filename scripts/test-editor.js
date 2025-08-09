#!/usr/bin/env node

/**
 * Script para testar o editor moderno
 * Cria uma landing page com várias seções para demonstração
 */

async function testModernEditor() {
  console.log('🎨 Testando Editor Moderno...\n');

  try {
    // 1. Fazer login
    console.log('1. Fazendo login...');
    const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'demo@lpfacil.com',
        password: 'demo123'
      }),
    });

    if (!loginResponse.ok) {
      console.log('❌ Erro no login. Criando usuário demo...');
      
      // Criar usuário demo
      const createResponse = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Demo Editor',
          email: 'demo@lpfacil.com',
          company: 'LPFácil Demo',
          phone: '(11) 99999-9999',
          password: 'demo123',
          source: 'editor-test'
        }),
      });

      if (createResponse.ok) {
        console.log('✅ Usuário demo criado');
        
        // Tentar login novamente
        const retryLoginResponse = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'demo@lpfacil.com',
            password: 'demo123'
          }),
        });

        if (!retryLoginResponse.ok) {
          console.log('❌ Erro no login após criar usuário');
          return;
        }
        
        const setCookieHeaderRetry = retryLoginResponse.headers.get('set-cookie');
        const sessionTokenRetry = setCookieHeaderRetry?.split('session_token=')[1]?.split(';')[0];

        if (!sessionTokenRetry) {
          console.log('❌ Token de sessão não encontrado no retry');
          return;
        }
        
        console.log('✅ Login bem-sucedido (retry)');
        sessionToken = sessionTokenRetry;
      } else {
        console.log('❌ Erro ao criar usuário demo');
        return;
      }
    }

    const setCookieHeader = loginResponse.headers.get('set-cookie');
    let sessionToken = setCookieHeader?.split('session_token=')[1]?.split(';')[0];

    if (!sessionToken) {
      console.log('❌ Token de sessão não encontrado');
      return;
    }

    console.log('✅ Login bem-sucedido');

    // 2. Criar landing page com seções estruturadas
    const landingPageData = {
      title: 'Landing Page Demonstração - Editor Moderno',
      template: 'editor-demo',
      sections: [
        {
          id: 'hero_' + Date.now() + '_001',
          type: 'hero',
          name: 'Hero Centralizado',
          content: {
            title: 'Bem-vindo ao Editor Moderno',
            subtitle: 'Crie landing pages incríveis',
            description: 'Com nosso editor visual você pode criar páginas profissionais em minutos',
            buttonText: 'Começar Agora',
            buttonLink: '#features',
            image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop'
          },
          styles: {
            backgroundColor: '#1e40af',
            textColor: '#ffffff',
            padding: { top: 80, bottom: 80, left: 20, right: 20 },
            alignment: 'center',
            shadow: false
          },
          order: 0,
          visible: true
        },
        {
          id: 'features_' + Date.now() + '_002',
          type: 'features',
          name: 'Features em Grade',
          content: {
            title: 'Recursos Incríveis',
            subtitle: 'Tudo que você precisa para converter',
            items: [
              {
                id: '1',
                title: 'Editor Visual',
                description: 'Arrastar e soltar seções facilmente',
                icon: '🎨'
              },
              {
                id: '2',
                title: 'Templates Prontos',
                description: 'Dezenas de seções pré-construídas',
                icon: '📋'
              },
              {
                id: '3',
                title: 'Customização Total',
                description: 'Cores, espaçamentos e estilos',
                icon: '🎛️'
              },
              {
                id: '4',
                title: 'Preview em Tempo Real',
                description: 'Veja as mudanças instantaneamente',
                icon: '⚡'
              }
            ]
          },
          styles: {
            backgroundColor: '#ffffff',
            textColor: '#374151',
            padding: { top: 60, bottom: 60, left: 20, right: 20 },
            alignment: 'center',
            shadow: false
          },
          order: 1,
          visible: true
        },
        {
          id: 'testimonials_' + Date.now() + '_003',
          type: 'testimonials',
          name: 'Depoimentos',
          content: {
            title: 'O Que Nossos Usuários Dizem',
            subtitle: 'Histórias de sucesso reais',
            items: [
              {
                id: '1',
                title: 'Ana Silva',
                description: 'O editor é fantástico! Consegui criar minha landing page em 15 minutos.',
                image: 'https://images.unsplash.com/photo-1494790108755-2616b612c7e5?w=100&h=100&fit=crop&crop=face'
              },
              {
                id: '2',
                title: 'Carlos Santos',
                description: 'Interface intuitiva e resultados profissionais. Recomendo!',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
              }
            ]
          },
          styles: {
            backgroundColor: '#1f2937',
            textColor: '#ffffff',
            padding: { top: 60, bottom: 60, left: 20, right: 20 },
            alignment: 'center',
            shadow: true
          },
          order: 2,
          visible: true
        },
        {
          id: 'cta_' + Date.now() + '_004',
          type: 'cta',
          name: 'Call to Action',
          content: {
            title: 'Pronto para Começar?',
            subtitle: 'Crie sua primeira landing page agora mesmo',
            buttonText: 'Começar Gratuitamente',
            buttonLink: '/signup'
          },
          styles: {
            backgroundColor: '#059669',
            textColor: '#ffffff',
            padding: { top: 50, bottom: 50, left: 20, right: 20 },
            alignment: 'center',
            shadow: false
          },
          order: 3,
          visible: true
        }
      ],
      settings: {
        seoTitle: 'Demonstração do Editor Moderno',
        seoDescription: 'Landing page criada com o editor visual moderno'
      },
      status: 'draft'
    };

    console.log('\n📝 Criando landing page com 4 seções...');
    const response = await fetch('http://localhost:3000/api/landing-pages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `session_token=${sessionToken}`
      },
      body: JSON.stringify(landingPageData),
    });

    if (response.ok) {
      const newPage = await response.json();
      console.log(`✅ Landing page criada: ${newPage.title}`);
      console.log(`📊 ID: ${newPage.id}`);
      console.log(`🗂️ ${newPage.sections?.length || 0} seções criadas`);
      
      console.log('\n🎯 Para testar o editor:');
      console.log('1. Acesse http://localhost:3000/login');
      console.log('2. Email: demo@lpfacil.com');
      console.log('3. Senha: demo123');
      console.log('4. Vá para o Dashboard');
      console.log(`5. Clique em "Editar" na landing page: ${newPage.title}`);
      console.log('\n📖 No editor você pode:');
      console.log('• Selecionar seções clicando nelas');
      console.log('• Usar o painel lateral para adicionar novas seções');
      console.log('• Customizar cores, textos e estilos');
      console.log('• Reorganizar seções com os botões up/down');
      console.log('• Alternar entre modo edição e preview');
      
    } else {
      const error = await response.text();
      console.log('❌ Erro ao criar landing page:', error);
    }

  } catch (error) {
    console.error('❌ Erro durante teste:', error.message);
  }
}

testModernEditor();
