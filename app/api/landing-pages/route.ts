import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseConfig';
import { getCurrentUser, requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json(
        { error: 'Firebase não configurado' },
        { status: 500 }
      );
    }

    // Verificar autenticação do usuário
    const user = await getCurrentUser(request);
    const authCheck = requireAuth(user);
    
    if (!authCheck.success) {
      return NextResponse.json(
        { error: authCheck.error },
        { status: 401 }
      );
    }

    // Buscar apenas landing pages do usuário atual
    const snapshot = await db.collection('landing-pages')
      .where('userId', '==', user!.id)
      .get();

    const landingPages = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json(landingPages);
  } catch (error) {
    console.error('Erro ao buscar landing pages:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json(
        { error: 'Firebase não configurado' },
        { status: 500 }
      );
    }

    // Verificar autenticação do usuário
    const user = await getCurrentUser(request);
    const authCheck = requireAuth(user);
    
    if (!authCheck.success) {
      return NextResponse.json(
        { error: authCheck.error },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, template, sections, settings, status } = body;

    // Validação básica
    if (!title) {
      return NextResponse.json(
        { error: 'Título é obrigatório' },
        { status: 400 }
      );
    }

    const landingPageData = {
      title,
      userId: user!.id, // Usar ID do usuário autenticado
      template: template || 'default',
      sections: sections || [],
      settings: settings || {},
      status: status || 'draft',
      views: 0,
      conversions: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await db.collection('landing-pages').add(landingPageData);
    
    const newLandingPage = {
      id: docRef.id,
      ...landingPageData,
    };

    return NextResponse.json(newLandingPage, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar landing page:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
