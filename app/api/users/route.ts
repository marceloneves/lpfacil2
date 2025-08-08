import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseConfig';

export async function GET() {
  try {
    if (!db) {
      return NextResponse.json(
        { error: 'Firebase não configurado' },
        { status: 500 }
      );
    }

    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();
    
    const users = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
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

    const body = await request.json();
               const { name, email, password, company, phone, source, status } = body;

           // Validação básica
           if (!name || !email || !password) {
             return NextResponse.json(
               { error: 'Nome, email e senha são obrigatórios' },
               { status: 400 }
             );
           }

           if (password.length < 6) {
             return NextResponse.json(
               { error: 'A senha deve ter pelo menos 6 caracteres' },
               { status: 400 }
             );
           }

    const userData = {
      name,
      email,
      password, // Usar a senha fornecida pelo usuário
      company: company || null,
      phone: phone || null,
      source: source || 'website',
      status: status || 'lead',
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection('users').add(userData);
    
    const newUser = {
      id: docRef.id,
      ...userData,
    };

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
