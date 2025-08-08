import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseConfig';
import { getCurrentUser, requireAuth } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
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

    const { id } = params;
    const body = await request.json();
    const { title, template, updatedAt } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Título é obrigatório' },
        { status: 400 }
      );
    }

    // Verificar se a landing page existe e pertence ao usuário
    const pageRef = db.collection('landing-pages').doc(id);
    const pageDoc = await pageRef.get();

    if (!pageDoc.exists) {
      return NextResponse.json(
        { error: 'Landing page não encontrada' },
        { status: 404 }
      );
    }

    const pageData = pageDoc.data();
    
    // Verificar se a landing page pertence ao usuário atual
    if (pageData!.userId !== user!.id) {
      return NextResponse.json(
        { error: 'Acesso negado' },
        { status: 403 }
      );
    }

    // Atualizar a landing page
    const updateData: any = {
      title,
      updatedAt: updatedAt || new Date().toISOString(),
    };

    if (template) {
      updateData.template = template;
    }

    await pageRef.update(updateData);

    // Buscar a landing page atualizada
    const updatedDoc = await pageRef.get();
    const updatedPage = { id: updatedDoc.id, ...updatedDoc.data() };

    return NextResponse.json(updatedPage, { status: 200 });
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
  { params }: { params: { id: string } }
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

    const { id } = params;

    // Verificar se a landing page existe e pertence ao usuário
    const pageRef = db.collection('landing-pages').doc(id);
    const pageDoc = await pageRef.get();

    if (!pageDoc.exists) {
      return NextResponse.json(
        { error: 'Landing page não encontrada' },
        { status: 404 }
      );
    }

    const pageData = pageDoc.data();
    
    // Verificar se a landing page pertence ao usuário atual
    if (pageData!.userId !== user!.id) {
      return NextResponse.json(
        { error: 'Acesso negado' },
        { status: 403 }
      );
    }

    // Deletar a landing page
    await pageRef.delete();

    return NextResponse.json(
      { message: 'Landing page deletada com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao deletar landing page:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
