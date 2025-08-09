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

    // Buscar dados completos do usuário
    const userDoc = await db.collection('users').doc(user!.id).get();

    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();

    // Retornar dados do perfil (sem senha)
    const profile = {
      id: userDoc.id,
      name: userData!.name,
      email: userData!.email,
      company: userData!.company || '',
      phone: userData!.phone || '',
      createdAt: userData!.createdAt,
      updatedAt: userData!.updatedAt || userData!.createdAt,
    };

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
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
    const { name, email, company, phone, currentPassword, newPassword } = body;

    // Validação básica
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nome e email são obrigatórios' },
        { status: 400 }
      );
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Verificar se o usuário existe
    const userRef = db.collection('users').doc(user!.id);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();

    // Se está tentando alterar a senha, verificar a senha atual
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: 'Senha atual é obrigatória para alterar a senha' },
          { status: 400 }
        );
      }

      if (currentPassword !== userData!.password) {
        return NextResponse.json(
          { error: 'Senha atual incorreta' },
          { status: 400 }
        );
      }

      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: 'Nova senha deve ter pelo menos 6 caracteres' },
          { status: 400 }
        );
      }
    }

    // Verificar se o email já está em uso por outro usuário
    if (email !== userData!.email) {
      const emailQuery = await db.collection('users').where('email', '==', email).get();
      if (!emailQuery.empty) {
        const existingUser = emailQuery.docs[0];
        if (existingUser.id !== user!.id) {
          return NextResponse.json(
            { error: 'Este email já está em uso' },
            { status: 400 }
          );
        }
      }
    }

    // Preparar dados para atualização
    const updateData: any = {
      name,
      email,
      company: company || null,
      phone: phone || null,
      updatedAt: new Date().toISOString(),
    };

    // Incluir nova senha se fornecida
    if (newPassword) {
      updateData.password = newPassword;
    }

    // Atualizar o perfil
    await userRef.update(updateData);

    // Buscar dados atualizados (sem senha)
    const updatedDoc = await userRef.get();
    const updatedData = updatedDoc.data();

    const updatedProfile = {
      id: updatedDoc.id,
      name: updatedData!.name,
      email: updatedData!.email,
      company: updatedData!.company || '',
      phone: updatedData!.phone || '',
      createdAt: updatedData!.createdAt,
      updatedAt: updatedData!.updatedAt,
    };

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
