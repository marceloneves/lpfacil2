import { NextRequest, NextResponse } from 'next/server';
import { helpArticles, searchArticles } from '@/lib/helpData';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const all = searchParams.get('all');

    // Buscar artigos por pesquisa
    if (search) {
      const searchResults = searchArticles(search);
      return NextResponse.json({
        articles: searchResults,
        total: searchResults.length,
        query: search
      });
    }

    // Retornar todos os artigos (sem filtros)
    return NextResponse.json({
      articles: helpArticles,
      total: helpArticles.length
    });

  } catch (error) {
    console.error('Erro ao buscar artigos de ajuda:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
