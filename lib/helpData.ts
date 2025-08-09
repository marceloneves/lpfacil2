export interface HelpArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  lastUpdated: string;
  readTime: number; // em minutos
  popular: boolean;
}

export interface HelpCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  order: number;
}

export const helpCategories: HelpCategory[] = [
  {
    id: 'getting-started',
    name: 'Primeiros Passos',
    description: 'Como começar a usar o LPFácil2',
    icon: '🚀',
    order: 1
  },
  {
    id: 'templates',
    name: 'Templates',
    description: 'Tudo sobre nossos templates de landing page',
    icon: '🎨',
    order: 2
  },
  {
    id: 'editor',
    name: 'Editor',
    description: 'Como usar o editor de landing pages',
    icon: '✏️',
    order: 3
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Gerenciando suas landing pages',
    icon: '📊',
    order: 4
  },
  {
    id: 'account',
    name: 'Conta e Perfil',
    description: 'Configurações da sua conta',
    icon: '👤',
    order: 5
  },
  {
    id: 'troubleshooting',
    name: 'Solução de Problemas',
    description: 'Resolvendo problemas comuns',
    icon: '🔧',
    order: 6
  }
];

export const helpArticles: HelpArticle[] = [
  // Primeiros Passos
  {
    id: 'welcome',
    title: 'Bem-vindo ao LPFácil2',
    content: `
# Bem-vindo ao LPFácil2! 🎉

O LPFácil2 é uma plataforma completa para criação de landing pages profissionais. Com nossos templates otimizados e editor intuitivo, você pode criar páginas que convertem em minutos.

## O que você pode fazer:

### 🎨 **Escolher Templates**
- 8 categorias diferentes de templates
- Designs modernos e responsivos
- Otimizados para conversão

### ✏️ **Editar suas Páginas**
- Editor visual intuitivo
- Personalização completa
- Preview em tempo real

### 📊 **Acompanhar Resultados**
- Dashboard com estatísticas
- Métricas de conversão
- Análise de performance

## Primeiros Passos:

1. **Explore os Templates** - Visite a seção de templates e escolha o que melhor se adapta ao seu objetivo
2. **Crie sua Primeira Página** - Use nosso editor para personalizar sua landing page
3. **Publique e Compartilhe** - Sua página estará pronta para receber visitantes

Precisa de ajuda? Continue navegando em nossa central de ajuda ou entre em contato conosco!
    `,
    category: 'getting-started',
    tags: ['introdução', 'primeiros passos', 'tutorial'],
    lastUpdated: '2024-01-20',
    readTime: 3,
    popular: true
  },
  
  {
    id: 'creating-first-page',
    title: 'Criando sua Primeira Landing Page',
    content: `
# Criando sua Primeira Landing Page 🚀

Siga este guia passo a passo para criar sua primeira landing page no LPFácil2.

## Passo 1: Escolher um Template

1. No dashboard, clique em **"Criar Nova Landing Page"**
2. Navegue pelas categorias de templates:
   - **Vendas** - Para produtos e serviços
   - **Leads** - Para captura de emails
   - **Lançamentos** - Para novos produtos
   - **Webinars** - Para eventos online
   - E muito mais!

3. Use os **filtros** para encontrar o template ideal
4. Clique em **"Usar Template"** no template escolhido

## Passo 2: Configurar sua Página

1. **Defina um título** descritivo para sua página
2. O template será carregado no editor
3. Você verá o **preview** do template selecionado

## Passo 3: Personalizar (Em Breve)

Em breve você poderá:
- Editar textos e imagens
- Personalizar cores e fontes
- Adicionar seções customizadas
- Configurar formulários de contato

## Passo 4: Salvar e Publicar

1. Clique em **"Salvar Página"**
2. Sua página será salva no dashboard
3. Em breve: publicação com domínio personalizado

## Dicas Importantes:

- **Seja específico** no título da página para facilitar o gerenciamento
- **Escolha o template certo** para seu objetivo
- **Mantenha o foco** no objetivo principal da página

Precisa de mais ajuda? Consulte outros artigos desta seção!
    `,
    category: 'getting-started',
    tags: ['tutorial', 'primeira página', 'passo a passo'],
    lastUpdated: '2024-01-20',
    readTime: 5,
    popular: true
  },

  // Templates
  {
    id: 'template-categories',
    title: 'Entendendo as Categorias de Templates',
    content: `
# Entendendo as Categorias de Templates 🎨

Nossos templates são organizados em categorias para ajudar você a encontrar o design perfeito para seu objetivo.

## Categorias Disponíveis:

### 🏷️ **Vendas**
**Ideal para:** Vender produtos ou serviços
**Recursos:**
- Call-to-action destacado
- Formulário de contato
- Seção de testimonials
- Otimizado para conversão

### 📧 **Captura de Leads**
**Ideal para:** Construir lista de emails
**Recursos:**
- Formulário de lead proeminente
- Oferta de ebook gratuito
- Newsletter signup
- Foco na conversão de visitantes

### 🎉 **Lançamento de Produto**
**Ideal para:** Apresentar novos produtos
**Recursos:**
- Contador regressivo
- Sistema de pre-order
- Demo do produto
- Criação de expectativa

### 🎓 **Webinar**
**Ideal para:** Eventos e apresentações online
**Recursos:**
- Calendário de eventos
- Agenda detalhada
- Inscrição simples
- Informações do apresentador

### 📱 **Download de App**
**Ideal para:** Promover aplicativos
**Recursos:**
- Screenshots do app
- Reviews e avaliações
- Links de download direto
- Compatibilidade de dispositivos

### 🎪 **Evento**
**Ideal para:** Conferências e eventos
**Recursos:**
- Programação completa
- Informações de palestrantes
- Sistema de inscrição
- Localização e logística

### 💼 **SaaS**
**Ideal para:** Software como serviço
**Recursos:**
- Planos de preços
- Demo interativo
- Trial gratuito
- Comparação de recursos

### 🛒 **E-commerce**
**Ideal para:** Lojas online
**Recursos:**
- Catálogo de produtos
- Carrinho de compras
- Sistema de checkout
- Avaliações de produtos

## Como Escolher:

1. **Defina seu objetivo principal**
2. **Identifique seu público-alvo**
3. **Considere o tipo de conversão desejada**
4. **Escolha a categoria correspondente**

## Dica Pro:

Todos os templates são **responsivos** e **otimizados para SEO**. Você pode personalizar qualquer template para se adequar perfeitamente à sua marca!
    `,
    category: 'templates',
    tags: ['templates', 'categorias', 'escolha'],
    lastUpdated: '2024-01-20',
    readTime: 4,
    popular: true
  },

  // Editor
  {
    id: 'editor-overview',
    title: 'Visão Geral do Editor',
    content: `
# Visão Geral do Editor ✏️

O editor do LPFácil2 permite personalizar suas landing pages de forma intuitiva e profissional.

## Interface do Editor:

### 🔙 **Navegação**
- **Voltar** - Retorna para templates ou dashboard
- **Cancelar** - Descarta alterações não salvas
- **Salvar/Atualizar** - Salva suas alterações

### 📝 **Configuração**
- **Título da Página** - Define o nome da sua landing page
- **Template Selecionado** - Mostra qual template você está usando
- **Modo de Edição** - Indica se está criando ou editando

### 👁️ **Preview**
- **Visualização** - Mostra como ficará sua página
- **Template Info** - Detalhes sobre o template
- **Recursos Incluídos** - Lista de funcionalidades

## Funcionalidades Atuais:

### ✅ **Disponível Agora:**
- Configuração de título
- Seleção de template
- Preview do resultado
- Salvamento seguro

### 🔜 **Em Desenvolvimento:**
- Editor visual completo
- Personalização de cores
- Upload de imagens
- Edição de textos
- Configuração de formulários

## Como Usar:

1. **Acesse o editor** através do dashboard ou templates
2. **Configure o título** da sua página
3. **Visualize o preview** do template
4. **Salve** suas alterações
5. **Gerencie** suas páginas no dashboard

## Modos do Editor:

### 🆕 **Modo Criação**
- Acesso via "Criar Nova Landing Page"
- Seleção de template obrigatória
- Botão "Salvar Página"

### ✏️ **Modo Edição**
- Acesso via botão "Editar" no dashboard
- Template e título pré-carregados
- Botão "Atualizar Página"
- Indicador visual de edição

## Dicas:

- **Seja específico** no título para facilitar organização
- **Use preview** para validar o resultado
- **Salve frequentemente** para não perder alterações
    `,
    category: 'editor',
    tags: ['editor', 'interface', 'funcionalidades'],
    lastUpdated: '2024-01-20',
    readTime: 3,
    popular: false
  },

  // Dashboard
  {
    id: 'dashboard-overview',
    title: 'Navegando pelo Dashboard',
    content: `
# Navegando pelo Dashboard 📊

O dashboard é o centro de controle das suas landing pages. Aqui você pode gerenciar, editar e acompanhar o desempenho das suas páginas.

## Seções do Dashboard:

### 📈 **Estatísticas Principais**
- **Visualizações Totais** - Quantas pessoas visitaram suas páginas
- **Conversões** - Número de ações realizadas pelos visitantes
- **Landing Pages** - Quantidade total de páginas criadas
- **Taxa de Conversão** - Percentual de visitantes que converteram

### 🎯 **Criar Nova Landing Page**
- Botão central para iniciar uma nova página
- Redireciona para seleção de templates
- Acesso rápido ao processo de criação

### 📝 **Suas Landing Pages**
Lista completa das suas páginas com:

#### 📊 **Informações de Cada Página:**
- **Título** - Nome da landing page
- **Status** - Rascunho, Publicada ou Arquivada
- **Datas** - Criação e última atualização
- **Métricas** - Visualizações e conversões

#### 🔧 **Ações Disponíveis:**
- **Editar** - Modificar a página no editor
- **Visualizar** - Ver como ficará para os visitantes
- **Excluir** - Remover permanentemente (com confirmação)

## Menu Lateral:

### 🏠 **Dashboard**
- Visão geral das suas páginas
- Estatísticas consolidadas
- Acesso rápido às principais ações

### 👤 **Perfil**
- Edição de dados pessoais
- Alteração de senha
- Configurações da conta

### 🆘 **Ajuda**
- Central de ajuda completa
- Artigos e tutoriais
- Solução de problemas

## Estados das Landing Pages:

### 📝 **Rascunho**
- Página em desenvolvimento
- Não visível publicamente
- Pode ser editada livremente

### ✅ **Publicada**
- Página ativa e acessível
- Recebendo visitantes
- Gerando métricas

### 📦 **Arquivada**
- Página inativa temporariamente
- Dados preservados
- Pode ser reativada

## Dicas de Uso:

- **Organize** suas páginas com títulos descritivos
- **Monitore** as métricas regularmente
- **Teste** diferentes templates para otimizar conversões
- **Mantenha** apenas páginas ativas publicadas
    `,
    category: 'dashboard',
    tags: ['dashboard', 'navegação', 'métricas'],
    lastUpdated: '2024-01-20',
    readTime: 4,
    popular: true
  },

  // Conta e Perfil
  {
    id: 'editing-profile',
    title: 'Editando seu Perfil',
    content: `
# Editando seu Perfil 👤

Mantenha suas informações sempre atualizadas para uma experiência personalizada.

## Acessando o Perfil:

1. No dashboard, clique na aba **"Perfil"** no menu lateral
2. Clique em **"Editar Perfil"** para fazer alterações
3. Modifique os campos desejados
4. Clique em **"Salvar"** para confirmar as alterações

## Campos Editáveis:

### ✅ **Informações Obrigatórias:**
- **Nome** - Seu nome completo
- **Email** - Endereço de email (único no sistema)

### 📋 **Informações Opcionais:**
- **Empresa** - Nome da sua empresa ou organização
- **Telefone** - Número de contato

## Alterando sua Senha:

1. No modo de edição, clique em **"Alterar senha"**
2. Digite sua **senha atual**
3. Digite a **nova senha** (mínimo 6 caracteres)
4. **Confirme** a nova senha
5. Clique em **"Salvar"**

## Informações da Conta:

### 📅 **Datas Importantes:**
- **Conta criada** - Quando você se cadastrou
- **Última atualização** - Quando foi a última modificação no perfil

## Validações de Segurança:

### 🔒 **Email Único**
- Cada email pode estar associado a apenas uma conta
- Sistema valida automaticamente se o email já está em uso

### 🔐 **Alteração de Senha**
- Senha atual obrigatória para confirmação
- Nova senha deve ter pelo menos 6 caracteres
- Confirmação deve coincidir com a nova senha

## Dicas de Segurança:

- **Use senhas fortes** com letras, números e símbolos
- **Mantenha seu email atualizado** para receber notificações importantes
- **Revise suas informações** periodicamente
- **Não compartilhe** suas credenciais de acesso

## Problemas Comuns:

### ❌ **"Email já está em uso"**
- Outro usuário já cadastrou este email
- Use um email diferente ou recupere a conta existente

### ❌ **"Senha atual incorreta"**
- Verifique se digitou a senha correta
- Use a opção de recuperação de senha se necessário

### ❌ **"Nova senha muito fraca"**
- Use pelo menos 6 caracteres
- Combine letras maiúsculas, minúsculas e números
    `,
    category: 'account',
    tags: ['perfil', 'edição', 'senha', 'segurança'],
    lastUpdated: '2024-01-20',
    readTime: 3,
    popular: false
  },

  // Solução de Problemas
  {
    id: 'common-issues',
    title: 'Problemas Comuns e Soluções',
    content: `
# Problemas Comuns e Soluções 🔧

Encontre soluções rápidas para os problemas mais comuns do LPFácil2.

## 🔐 Problemas de Login

### ❌ **Não consigo fazer login**
**Possíveis causas:**
- Email ou senha incorretos
- Conta não existe
- Problema de conexão

**Soluções:**
1. Verifique se o email está correto
2. Certifique-se de usar a senha correta
3. Tente criar uma nova conta se não tiver cadastro
4. Verifique sua conexão com a internet

### ❌ **Esqueci minha senha**
**Solução:**
1. Na tela de login, clique em "Esqueci minha senha" *(em desenvolvimento)*
2. Digite seu email cadastrado
3. Siga as instruções do email recebido
4. **Alternativa atual:** Entre em contato conosco

## 📱 Problemas de Interface

### ❌ **Página não carrega completamente**
**Soluções:**
1. Recarregue a página (F5 ou Ctrl+R)
2. Limpe o cache do navegador
3. Tente em modo anônimo/privado
4. Verifique se JavaScript está habilitado

### ❌ **Botões não funcionam**
**Soluções:**
1. Aguarde o carregamento completo da página
2. Clique apenas uma vez e aguarde
3. Recarregue a página
4. Tente em outro navegador

## 🎨 Problemas com Templates

### ❌ **Template não aparece corretamente**
**Soluções:**
1. Aguarde o carregamento completo
2. Recarregue a página
3. Tente outro template temporariamente
4. Verifique sua conexão

### ❌ **Não consigo salvar alterações**
**Soluções:**
1. Verifique se o título está preenchido
2. Aguarde o término de outras operações
3. Recarregue e tente novamente
4. Verifique sua conexão

## 📊 Problemas no Dashboard

### ❌ **Landing pages não aparecem**
**Possíveis causas:**
- Ainda não criou nenhuma página
- Problema de carregamento
- Não está logado

**Soluções:**
1. Crie sua primeira landing page
2. Recarregue a página
3. Faça login novamente se necessário

### ❌ **Estatísticas não atualizam**
**Soluções:**
1. As métricas são atualizadas periodicamente
2. Aguarde alguns minutos
3. Recarregue a página

## 🌐 Problemas de Conexão

### ❌ **"Erro de conexão"**
**Soluções:**
1. Verifique sua internet
2. Tente recarregar a página
3. Aguarde alguns minutos
4. Tente em outro dispositivo

### ❌ **Página muito lenta**
**Soluções:**
1. Verifique velocidade da internet
2. Feche outras abas do navegador
3. Tente em horário de menor tráfego
4. Limpe cache do navegador

## 🆘 Quando Buscar Ajuda

Entre em contato conosco se:
- O problema persiste após tentar as soluções
- Você encontrou um erro não listado aqui
- Precisa de ajuda personalizada
- Quer sugerir melhorias

## 📧 Como Entrar em Contato

- **Email:** suporte@lpfacil2.com *(em desenvolvimento)*
- **Chat:** Botão de ajuda no canto inferior direito *(em desenvolvimento)*
- **GitHub:** Reporte problemas técnicos no repositório

## 🔄 Antes de Reportar um Problema

1. **Tente as soluções** desta página
2. **Anote os detalhes** do problema
3. **Inclua informações** do navegador e sistema
4. **Descreva os passos** que levaram ao problema
    `,
    category: 'troubleshooting',
    tags: ['problemas', 'soluções', 'troubleshooting', 'bugs'],
    lastUpdated: '2024-01-20',
    readTime: 6,
    popular: true
  }
];

export function getArticlesByCategory(categoryId: string): HelpArticle[] {
  return helpArticles.filter(article => article.category === categoryId);
}

export function searchArticles(query: string): HelpArticle[] {
  const lowercaseQuery = query.toLowerCase();
  return helpArticles.filter(article => 
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.content.toLowerCase().includes(lowercaseQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

export function getPopularArticles(): HelpArticle[] {
  return helpArticles.filter(article => article.popular);
}

export function getArticleById(id: string): HelpArticle | undefined {
  return helpArticles.find(article => article.id === id);
}
