#!/usr/bin/env node

const baseURL = 'http://localhost:3000';

async function testHelpSystem() {
  console.log('🆘 Testando Sistema de Wiki/Ajuda...\n');

  try {
    // Teste 1: Buscar categorias e artigos populares
    console.log('📚 Teste 1: Buscar categorias e artigos populares');
    console.log('GET /api/help');
    
    const categoriesResponse = await fetch(`${baseURL}/api/help`);
    
    if (categoriesResponse.ok) {
      const data = await categoriesResponse.json();
      console.log('✅ Categorias e artigos carregados com sucesso');
      console.log(`📊 ${data.categories.length} categorias encontradas`);
      console.log(`📄 ${data.articles.length} artigos populares`);
      console.log('📋 Categorias:', data.categories.map(cat => `${cat.icon} ${cat.name}`).join(', '));
    } else {
      console.log('❌ Erro ao carregar categorias:', await categoriesResponse.text());
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Teste 2: Buscar artigos por categoria
    console.log('🎨 Teste 2: Buscar artigos por categoria (getting-started)');
    console.log('GET /api/help?category=getting-started');

    const categoryResponse = await fetch(`${baseURL}/api/help?category=getting-started`);
    
    if (categoryResponse.ok) {
      const data = await categoryResponse.json();
      console.log('✅ Artigos da categoria carregados com sucesso');
      console.log(`📊 Categoria: ${data.category.icon} ${data.category.name}`);
      console.log(`📄 ${data.articles.length} artigos encontrados`);
      console.log('📋 Artigos:', data.articles.map(art => `"${art.title}"`).join(', '));
    } else {
      console.log('❌ Erro ao carregar categoria:', await categoryResponse.text());
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Teste 3: Buscar artigos por pesquisa
    console.log('🔍 Teste 3: Buscar artigos por pesquisa (login)');
    console.log('GET /api/help?search=login');

    const searchResponse = await fetch(`${baseURL}/api/help?search=login`);
    
    if (searchResponse.ok) {
      const data = await searchResponse.json();
      console.log('✅ Busca realizada com sucesso');
      console.log(`🔍 Query: "${data.query}"`);
      console.log(`📄 ${data.articles.length} artigos encontrados`);
      if (data.articles.length > 0) {
        console.log('📋 Resultados:', data.articles.map(art => `"${art.title}"`).join(', '));
      }
    } else {
      console.log('❌ Erro na busca:', await searchResponse.text());
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Teste 4: Buscar artigo específico
    console.log('📖 Teste 4: Buscar artigo específico (welcome)');
    console.log('GET /api/help/welcome');

    const articleResponse = await fetch(`${baseURL}/api/help/welcome`);
    
    if (articleResponse.ok) {
      const article = await articleResponse.json();
      console.log('✅ Artigo carregado com sucesso');
      console.log(`📄 Título: "${article.title}"`);
      console.log(`🏷️ Categoria: ${article.category}`);
      console.log(`⏱️ Tempo de leitura: ${article.readTime} minutos`);
      console.log(`🏆 Popular: ${article.popular ? 'Sim' : 'Não'}`);
      console.log(`🔖 Tags: ${article.tags.join(', ')}`);
      console.log(`📅 Última atualização: ${article.lastUpdated}`);
    } else {
      console.log('❌ Erro ao carregar artigo:', await articleResponse.text());
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Teste 5: Buscar categoria inexistente
    console.log('❓ Teste 5: Buscar categoria inexistente');
    console.log('GET /api/help?category=categoria-inexistente');

    const invalidCategoryResponse = await fetch(`${baseURL}/api/help?category=categoria-inexistente`);
    
    if (invalidCategoryResponse.ok) {
      console.log('⚠️ Categoria inexistente retornou dados (isso pode estar incorreto)');
    } else {
      console.log('✅ Categoria inexistente retornou erro 404 (comportamento correto)');
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Teste 6: Buscar artigo inexistente
    console.log('❓ Teste 6: Buscar artigo inexistente');
    console.log('GET /api/help/artigo-inexistente');

    const invalidArticleResponse = await fetch(`${baseURL}/api/help/artigo-inexistente`);
    
    if (invalidArticleResponse.ok) {
      console.log('⚠️ Artigo inexistente retornou dados (isso pode estar incorreto)');
    } else {
      console.log('✅ Artigo inexistente retornou erro 404 (comportamento correto)');
    }

    console.log('\n' + '='.repeat(50) + '\n');

  } catch (error) {
    console.error('🚨 Erro de conexão:', error.message);
    console.log('\n💡 Certifique-se de que o servidor está rodando em http://localhost:3000');
  }

  console.log('🎯 Teste Completo! \n');
  console.log('📋 Para testar a interface:');
  console.log('1. Acesse http://localhost:3000/dashboard');
  console.log('2. Clique na aba "Ajuda"');
  console.log('3. Explore as categorias');
  console.log('4. Use a busca para encontrar artigos');
  console.log('5. Clique em um artigo para ver o conteúdo completo');
  console.log('6. Teste a navegação entre artigos e categorias');
  
  console.log('\n✨ Funcionalidades disponíveis:');
  console.log('• 6 categorias de ajuda organizadas');
  console.log('• Sistema de busca em tempo real');
  console.log('• Artigos com markdown e formatação');
  console.log('• Interface moderna e responsiva');
  console.log('• Tags e tempo de leitura');
  console.log('• Artigos populares destacados');
}

// Executar os testes
testHelpSystem();
