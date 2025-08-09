#!/usr/bin/env node

const baseURL = 'http://localhost:3000';

async function testProfile() {
  console.log('🧪 Testando Sistema de Perfil do Usuário...\n');

  try {
    console.log('📋 IMPORTANTE: Este teste requer autenticação');
    console.log('1. Faça login na aplicação primeiro');
    console.log('2. Copie o cookie de sessão do navegador');
    console.log('3. Execute este teste com o cookie\n');

    // Teste 1: Buscar perfil do usuário
    console.log('🔍 Teste 1: Buscar perfil do usuário');
    console.log('GET /api/users/profile');
    
    const profileResponse = await fetch(`${baseURL}/api/users/profile`, {
      headers: {
        'Cookie': 'session_token=seu-token-aqui' // Substituir pelo token real
      }
    });
    
    if (profileResponse.ok) {
      const profile = await profileResponse.json();
      console.log('✅ Perfil carregado com sucesso');
      console.log('📊 Dados do perfil:', JSON.stringify(profile, null, 2));
    } else {
      const error = await profileResponse.json();
      console.log('❌ Erro ao carregar perfil:', error.error);
      console.log('💡 Certifique-se de estar autenticado\n');
      return;
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Teste 2: Atualizar perfil
    console.log('🔄 Teste 2: Atualizar perfil');
    console.log('PUT /api/users/profile');

    const updateData = {
      name: 'Nome Atualizado',
      email: 'email.atualizado@exemplo.com',
      company: 'Nova Empresa Ltda',
      phone: '(11) 98765-4321'
    };

    const updateResponse = await fetch(`${baseURL}/api/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'session_token=seu-token-aqui' // Substituir pelo token real
      },
      body: JSON.stringify(updateData)
    });

    if (updateResponse.ok) {
      const updatedProfile = await updateResponse.json();
      console.log('✅ Perfil atualizado com sucesso');
      console.log('📊 Perfil atualizado:', JSON.stringify(updatedProfile, null, 2));
    } else {
      const error = await updateResponse.json();
      console.log('❌ Erro ao atualizar perfil:', error.error);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Teste 3: Alterar senha
    console.log('🔐 Teste 3: Alterar senha');
    console.log('PUT /api/users/profile (com senha)');

    const passwordData = {
      name: 'Nome Atualizado',
      email: 'email.atualizado@exemplo.com',
      company: 'Nova Empresa Ltda',
      phone: '(11) 98765-4321',
      currentPassword: 'senha-atual',
      newPassword: 'nova-senha-123'
    };

    const passwordResponse = await fetch(`${baseURL}/api/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'session_token=seu-token-aqui' // Substituir pelo token real
      },
      body: JSON.stringify(passwordData)
    });

    if (passwordResponse.ok) {
      const updatedProfile = await passwordResponse.json();
      console.log('✅ Senha alterada com sucesso');
      console.log('📊 Perfil após alteração de senha:', JSON.stringify(updatedProfile, null, 2));
    } else {
      const error = await passwordResponse.json();
      console.log('❌ Erro ao alterar senha:', error.error);
      console.log('💡 Verifique se a senha atual está correta');
    }

    console.log('\n' + '='.repeat(50) + '\n');

  } catch (error) {
    console.error('🚨 Erro de conexão:', error.message);
    console.log('\n💡 Certifique-se de que o servidor está rodando em http://localhost:3000');
  }

  console.log('🎯 Teste Completo! \n');
  console.log('📋 Para testar a interface:');
  console.log('1. Acesse http://localhost:3000/dashboard');
  console.log('2. Clique na aba "Perfil"');
  console.log('3. Clique em "Editar Perfil"');
  console.log('4. Altere os dados e salve');
  console.log('5. Teste a alteração de senha (opcional)');
}

// Executar os testes
testProfile();
