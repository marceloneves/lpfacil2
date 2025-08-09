import { NextRequest, NextResponse } from 'next/server';
import { helpCategories, helpArticles, searchArticles, getArticlesByCategory, getPopularArticles } from '@/lib/helpData';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const popular = searchParams.get('popular');

    // Buscar artigos populares
    if (popular === 'true') {
      const popularArticles = getPopularArticles();
      return NextResponse.json({
        articles: popularArticles,
        categories: helpCategories,
        total: popularArticles.length
      });
    }

    // Buscar artigos por pesquisa
    if (search) {
      const searchResults = searchArticles(search);
      return NextResponse.json({
        articles: searchResults,
        categories: helpCategories,
        total: searchResults.length,
        query: search
      });
    }

    // Buscar artigos por categoria
    if (category) {
      const categoryArticles = getArticlesByCategory(category);
      const categoryInfo = helpCategories.find(cat => cat.id === category);
      
      if (!categoryInfo) {
        return NextResponse.json(
          { error: 'Categoria não encontrada' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        articles: categoryArticles,
        category: categoryInfo,
        categories: helpCategories,
        total: categoryArticles.length
      });
    }

    // Retornar todas as categorias e artigos populares por padrão
    const popularArticles = getPopularArticles();
    return NextResponse.json({
      categories: helpCategories,
      articles: popularArticles,
      total: helpArticles.length,
      showing: 'popular'
    });

  } catch (error) {
    console.error('Erro ao buscar artigos de ajuda:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
