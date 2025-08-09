import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseConfig';

export async function GET(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json(
        { error: 'Firebase não configurado' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug é obrigatório', available: false },
        { status: 400 }
      );
    }

    // Validar formato do slug
    if (!/^[a-z0-9-]+$/.test(slug) || slug.length < 3 || slug.length > 50) {
      return NextResponse.json(
        { error: 'Formato de slug inválido', available: false },
        { status: 400 }
      );
    }

    // Palavras reservadas para subdomínios
    const reserved = ['admin', 'api', 'www', 'blog', 'mail', 'ftp', 'localhost', 'dashboard', 'editor', 'preview', 'app', 'secure', 'login', 'signup'];
    if (reserved.includes(slug)) {
      return NextResponse.json(
        { error: 'Subdomínio reservado', available: false },
        { status: 400 }
      );
    }

    // Verificar se já existe no banco
    const snapshot = await db.collection('landing-pages')
      .where('slug', '==', slug)
      .limit(1)
      .get();

    const available = snapshot.empty;

    return NextResponse.json({
      available,
      slug,
      message: available ? 'Subdomínio disponível' : 'Subdomínio já está em uso'
    });

  } catch (error) {
    console.error('Erro ao verificar slug:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', available: false },
      { status: 500 }
    );
  }
}
