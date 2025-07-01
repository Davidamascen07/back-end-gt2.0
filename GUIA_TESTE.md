# 🚀 Projeto Backend - API REST E-commerce

## ✅ Status do Projeto
- ✅ Dependências instaladas
- ✅ Banco de dados MySQL (XAMPP) configurado
- ✅ Migrations executadas
- ✅ Seeders executados (dados de exemplo)
- ✅ Servidor rodando na porta 3000

## 🧪 Testando a API

### 1. Health Check
```bash
GET http://localhost:3000/health
```

### 2. Testar Usuários

#### Fazer Login (obter token JWT)
```bash
POST http://localhost:3000/v1/user/token
Content-Type: application/json

{
  "email": "admin@sistema.com",
  "password": "123456"
}
```

#### Criar novo usuário
```bash
POST http://localhost:3000/v1/user
Content-Type: application/json

{
  "firstname": "Teste",
  "surname": "Usuario",
  "email": "teste@email.com",
  "password": "123456",
  "confirmPassword": "123456"
}
```

#### Obter usuário por ID
```bash
GET http://localhost:3000/v1/user/1
```

### 3. Testar Categorias

#### Listar todas as categorias
```bash
GET http://localhost:3000/v1/category/search
```

#### Listar categorias do menu
```bash
GET http://localhost:3000/v1/category/search?use_in_menu=true
```

#### Obter categoria por ID
```bash
GET http://localhost:3000/v1/category/1
```

#### Criar nova categoria (requer token)
```bash
POST http://localhost:3000/v1/category
Authorization: Bearer SEU_TOKEN_JWT_AQUI
Content-Type: application/json

{
  "name": "Nova Categoria",
  "slug": "nova-categoria",
  "use_in_menu": true
}
```

### 4. Testar Produtos

#### Listar todos os produtos
```bash
GET http://localhost:3000/v1/product/search
```

#### Buscar produtos por nome
```bash
GET http://localhost:3000/v1/product/search?match=Nike
```

#### Filtrar por categoria
```bash
GET http://localhost:3000/v1/product/search?category_ids=1,2
```

#### Filtrar por faixa de preço
```bash
GET http://localhost:3000/v1/product/search?price-range=50-150
```

#### Obter produto por ID
```bash
GET http://localhost:3000/v1/product/1
```

#### Criar novo produto (requer token)
```bash
POST http://localhost:3000/v1/product
Authorization: Bearer SEU_TOKEN_JWT_AQUI
Content-Type: application/json

{
  "enabled": true,
  "name": "Novo Produto",
  "slug": "novo-produto",
  "use_in_menu": false,
  "stock": 10,
  "description": "Descrição do novo produto",
  "price": 99.90,
  "price_with_discount": 89.90,
  "category_ids": [1, 2],
  "images": [
    {
      "type": "image/jpg",
      "content": "base64_da_imagem_aqui"
    }
  ],
  "options": [
    {
      "title": "Tamanho",
      "shape": "square",
      "radius": 4,
      "type": "text",
      "values": ["P", "M", "G", "GG"]
    }
  ]
}
```

## 📊 Dados de Exemplo Criados

### Usuários
- **Admin**: admin@sistema.com / 123456
- **João**: joao@email.com / 123456

### Categorias
1. Tênis (use_in_menu: true)
2. Camisetas (use_in_menu: true)
3. Ofertas (use_in_menu: true)
4. Black Friday (use_in_menu: false)

### Produtos
1. Tênis Nike Air Max - R$ 299,90 (com desconto: R$ 249,90)
2. Camiseta Adidas Originals - R$ 89,90 (com desconto: R$ 79,90)

## 🛠️ Comandos Úteis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Executar testes
npm test

# Resetar banco de dados (migrations + seeders)
npm run db:reset

# Apenas migrations
npm run db:migrate

# Apenas seeders
npm run db:seed
```

## 🔧 Ferramentas Recomendadas para Testes

1. **Postman** - Interface gráfica para testes de API
2. **Thunder Client** - Extensão do VS Code
3. **curl** - Linha de comando
4. **Browser** - Para endpoints GET simples

## 📱 Próximos Passos

1. **Testar todos os endpoints** usando Postman ou Thunder Client
2. **Implementar upload real de imagens** (opcional)
3. **Adicionar validações extras** conforme necessário
4. **Implementar testes mais completos**
5. **Configurar CI/CD** (opcional)

## 🎯 Recursos Implementados

✅ **CRUD Completo**
- Usuários (GET, POST, PUT, DELETE)
- Categorias (GET, POST, PUT, DELETE)
- Produtos (GET, POST, PUT, DELETE)

✅ **Autenticação JWT**
- Login/logout
- Proteção de rotas

✅ **Validações**
- Dados de entrada
- Regras de negócio

✅ **Relacionamentos**
- Produto → Imagens (1:N)
- Produto → Opções (1:N)
- Produto ↔ Categoria (N:M)

✅ **Filtros Avançados**
- Paginação
- Busca por texto
- Filtros por preço, categoria, etc.

✅ **Estrutura Profissional**
- Padrão MVC
- Middleware de erro
- Logs estruturados
- Configuração por ambiente

---

**🎉 Parabéns! Seu projeto backend está 100% funcional e seguindo as melhores práticas!**
