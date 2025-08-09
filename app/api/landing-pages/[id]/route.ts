import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseConfig';
import { getCurrentUser, requireAuth } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!db) {
      return NextResponse.json(
        { error: 'Firebase não configurado' },
        { status: 500 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'ID da landing page é obrigatório' },
        { status: 400 }
      );
    }

    // Buscar landing page específica
    const doc = await db.collection('landing-pages').doc(id).get();

    if (!doc.exists) {
      return NextResponse.json(
        { error: 'Landing page não encontrada' },
        { status: 404 }
      );
    }

    const landingPage = {
      id: doc.id,
      ...doc.data()
    };

    return NextResponse.json(landingPage);
  } catch (error) {
    console.error('Erro ao buscar landing page:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'ID da landing page é obrigatório' },
        { status: 400 }
      );
    }

    // Verificar se a landing page existe e pertence ao usuário
    const existingDoc = await db.collection('landing-pages').doc(id).get();
    
    if (!existingDoc.exists) {
      return NextResponse.json(
        { error: 'Landing page não encontrada' },
        { status: 404 }
      );
    }

    const existingData = existingDoc.data();
    if (existingData?.userId !== user!.id) {
      return NextResponse.json(
        { error: 'Acesso negado' },
        { status: 403 }
      );
    }

    // Atualizar landing page
    const updateData = {
      ...body,
      userId: user!.id, // Garantir que userId não seja alterado
      updatedAt: new Date().toISOString(),
    };

    await db.collection('landing-pages').doc(id).update(updateData);

    const updatedDoc = await db.collection('landing-pages').doc(id).get();
    const updatedLandingPage = {
      id: updatedDoc.id,
      ...updatedDoc.data()
    };

    return NextResponse.json(updatedLandingPage);
  } catch (error) {
    console.error('Erro ao atualizar landing page:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'ID da landing page é obrigatório' },
        { status: 400 }
      );
    }

    // Verificar se a landing page existe e pertence ao usuário
    const existingDoc = await db.collection('landing-pages').doc(id).get();
    
    if (!existingDoc.exists) {
      return NextResponse.json(
        { error: 'Landing page não encontrada' },
        { status: 404 }
      );
    }

    const existingData = existingDoc.data();
    if (existingData?.userId !== user!.id) {
      return NextResponse.json(
        { error: 'Acesso negado' },
        { status: 403 }
      );
    }

    // Deletar landing page
    await db.collection('landing-pages').doc(id).delete();

    return NextResponse.json({ success: true, message: 'Landing page deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar landing page:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}