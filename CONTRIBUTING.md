# 🤝 Guia de Contribuição

Obrigado por considerar contribuir para o projeto **E-commerce Backend API**! 

## 📋 Índice

- [Como Contribuir](#como-contribuir)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Padrões de Código](#padrões-de-código)
- [Processo de Pull Request](#processo-de-pull-request)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Melhorias](#sugerir-melhorias)

## 🚀 Como Contribuir

### 1. Fork do Projeto
```bash
# Faça um fork do repositório
git clone https://github.com/seu-usuario/projeto-backend.git
cd projeto-backend
```

### 2. Configure o Ambiente
```bash
# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Configure o banco de dados
node create-database.js
node setup.js
```

### 3. Crie uma Branch
```bash
# Crie uma branch para sua feature/fix
git checkout -b feature/minha-nova-feature
# ou
git checkout -b fix/correcao-bug
```

### 4. Faça as Alterações
- Escreva código limpo e bem documentado
- Adicione testes para novas funcionalidades
- Mantenha a consistência com o código existente

### 5. Teste suas Alterações
```bash
# Execute os testes
npm test

# Verifique se o servidor ainda funciona
npm run dev
```

### 6. Commit e Push
```bash
# Commit seguindo padrões semânticos
git commit -m "feat: adiciona nova funcionalidade X"
git push origin feature/minha-nova-feature
```

### 7. Abra um Pull Request
- Use um título descritivo
- Descreva as mudanças realizadas
- Referencie issues relacionadas

## ⚙️ Configuração do Ambiente

### Pré-requisitos
- Node.js 18+
- MySQL 8.0+
- Git

### Setup Completo
```bash
# Clone e configure
git clone https://github.com/seu-usuario/projeto-backend.git
cd projeto-backend
npm install

# Configure banco de dados
cp .env.example .env
# Edite as configurações no .env
node create-database.js
node setup.js

# Teste
npm test
npm run dev
```

## 📝 Padrões de Código

### Estrutura de Arquivos
```
src/
├── controllers/    # Lógica de negócio
├── models/        # Modelos do banco
├── routes/        # Definição das rotas
├── middleware/    # Middlewares personalizados
├── validators/    # Validações
└── config/        # Configurações
```

### Convenções de Nomenclatura
- **Arquivos**: `PascalCase` para classes, `camelCase` para funções
- **Variáveis**: `camelCase`
- **Constantes**: `UPPER_SNAKE_CASE`
- **Rotas**: `kebab-case`

### Exemplo de Controller
```javascript
class ExampleController {
  // Método para listar recursos
  async index(req, res, next) {
    try {
      // Lógica aqui
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  // Método para criar recurso
  async store(req, res, next) {
    try {
      // Validações
      // Criação
      res.status(201).json(resource);
    } catch (error) {
      next(error);
    }
  }
}
```

### Validações
```javascript
const validation = {
  create: [
    body('field')
      .notEmpty()
      .withMessage('Campo obrigatório')
      .isLength({ min: 2, max: 100 })
      .withMessage('Deve ter entre 2 e 100 caracteres')
  ]
};
```

## 🔄 Processo de Pull Request

### Checklist Antes do PR
- [ ] Código segue os padrões estabelecidos
- [ ] Testes passando (`npm test`)
- [ ] Novas funcionalidades têm testes
- [ ] Documentação atualizada se necessário
- [ ] Commit messages seguem padrão semântico

### Template de PR
```markdown
## 📋 Descrição
Breve descrição das mudanças realizadas.

## 🎯 Tipo de Mudança
- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Breaking change
- [ ] Documentação

## ✅ Checklist
- [ ] Testes passando
- [ ] Código revisado
- [ ] Documentação atualizada

## 🧪 Como Testar
Instruções para testar as mudanças.
```

## 🐛 Reportar Bugs

### Antes de Reportar
1. Verifique se já existe uma issue similar
2. Teste na versão mais recente
3. Colete informações do ambiente

### Template de Bug Report
```markdown
## 🐛 Descrição do Bug
Descrição clara do problema.

## 🔄 Passos para Reproduzir
1. Vá para '...'
2. Clique em '...'
3. Veja o erro

## ✅ Comportamento Esperado
O que deveria acontecer.

## 📷 Screenshots
Se aplicável, adicione screenshots.

## 🖥️ Ambiente
- OS: [ex: Windows 10]
- Node.js: [ex: 18.17.0]
- MySQL: [ex: 8.0.34]
```

## 💡 Sugerir Melhorias

### Template de Feature Request
```markdown
## 🚀 Funcionalidade Proposta
Descrição clara da funcionalidade.

## 🎯 Problema Resolvido
Que problema esta funcionalidade resolve?

## 💡 Solução Proposta
Como você gostaria que funcionasse?

## 📋 Alternativas Consideradas
Outras soluções que você considerou.
```

## 📚 Tipos de Contribuição

### 🔧 Código
- Novas funcionalidades
- Correção de bugs
- Melhorias de performance
- Refatoração

### 📖 Documentação
- Melhoria do README
- Documentação da API
- Exemplos de uso
- Tutoriais

### 🧪 Testes
- Testes unitários
- Testes de integração
- Testes de performance

### 🎨 UI/UX
- Melhorias na API
- Padronização de respostas
- Mensagens de erro mais claras

## 🏷️ Commits Semânticos

Use o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<escopo>): <descrição>

<corpo opcional>

<rodapé opcional>
```

### Tipos
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação de código
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Manutenção

### Exemplos
```bash
feat(auth): adiciona autenticação JWT
fix(products): corrige filtro por preço
docs(readme): atualiza guia de instalação
test(users): adiciona testes para CRUD
```

## 🎉 Reconhecimento

Todos os contribuidores serão reconhecidos no projeto! Suas contribuições aparecerão:

- Na seção de colaboradores do GitHub
- No arquivo CONTRIBUTORS.md
- Nos release notes quando aplicável

## 📞 Dúvidas?

- Abra uma [issue](https://github.com/seu-usuario/projeto-backend/issues)
- Entre em contato: [seu@email.com](mailto:seu@email.com)

---

**Obrigado por contribuir! 🙏**
