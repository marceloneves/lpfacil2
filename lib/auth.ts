import { NextRequest } from 'next/server';
import { db } from '@/lib/firebaseConfig';

export interface User {
  id: string;
  name: string;
  email: string;
  company?: string;
}

export async function getCurrentUser(request: NextRequest): Promise<User | null> {
  try {
    if (!db) {
      return null;
    }

    const sessionToken = request.cookies.get('session_token')?.value;

    if (!sessionToken) {
      return null;
    }

    // Buscar sessão no Firebase
    const sessionsRef = db.collection('sessions');
    const snapshot = await sessionsRef.where('token', '==', sessionToken).limit(1).get();

    if (snapshot.empty) {
      return null;
    }

    const sessionDoc = snapshot.docs[0];
    const sessionData = sessionDoc.data();

    // Verificar se a sessão expirou
    if (new Date(sessionData.expiresAt) < new Date()) {
      // Remover sessão expirada
      await sessionDoc.ref.delete();
      return null;
    }

    // Buscar dados do usuário
    const userDoc = await db.collection('users').doc(sessionData.userId).get();

    if (!userDoc.exists) {
      return null;
    }

    const userData = userDoc.data();

    return {
      id: userDoc.id,
      name: userData.name,
      email: userData.email,
      company: userData.company,
    };
  } catch (error) {
    console.error('Erro ao obter usuário atual:', error);
    return null;
  }
}

export function requireAuth(user: User | null): { success: boolean; error?: string } {
  if (!user) {
    return { success: false, error: 'Usuário não autenticado' };
  }
  return { success: true };
}
