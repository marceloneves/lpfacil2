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

    const sessionToken = request.cookies.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Sessão não encontrada' },
        { status: 401 }
      );
    }

    // Buscar sessão no Firebase
    const sessionsRef = db.collection('sessions');
    const snapshot = await sessionsRef.where('token', '==', sessionToken).limit(1).get();

    if (snapshot.empty) {
      return NextResponse.json(
        { error: 'Sessão inválida' },
        { status: 401 }
      );
    }

    const sessionDoc = snapshot.docs[0];
    const sessionData = sessionDoc.data();

    // Verificar se a sessão expirou
    if (new Date(sessionData.expiresAt) < new Date()) {
      // Remover sessão expirada
      await sessionDoc.ref.delete();
      return NextResponse.json(
        { error: 'Sessão expirada' },
        { status: 401 }
      );
    }

    // Buscar dados do usuário
    const userDoc = await db.collection('users').doc(sessionData.userId).get();

    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();

    return NextResponse.json({
      success: true,
      user: {
        id: userDoc.id,
        name: userData.name,
        email: userData.email,
        company: userData.company,
      }
    });
  } catch (error) {
    console.error('Erro ao verificar sessão:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
