import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseConfig';

export async function POST(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json(
        { error: 'Firebase não configurado' },
        { status: 500 }
      );
    }

    const sessionToken = request.cookies.get('session_token')?.value;

    if (sessionToken) {
      // Remover sessão do Firebase
      const sessionsRef = db.collection('sessions');
      const snapshot = await sessionsRef.where('token', '==', sessionToken).limit(1).get();

      if (!snapshot.empty) {
        await snapshot.docs[0].ref.delete();
      }
    }

    const response = NextResponse.json({
      success: true,
      message: 'Logout realizado com sucesso'
    });

    // Remover cookie de sessão
    response.cookies.delete('session_token');

    return response;
  } catch (error) {
    console.error('Erro no logout:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
