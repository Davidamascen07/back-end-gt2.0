# API Documentation - Projeto Backend

## Visão Geral

Esta é uma API RESTful construída com Node.js, Express, MySQL e Sequelize para gerenciar um sistema de e-commerce.

## Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MySQL** - Banco de dados relacional
- **Sequelize** - ORM para Node.js
- **JWT** - Autenticação e autorização
- **bcryptjs** - Hash de senhas
- **express-validator** - Validação de dados
- **Jest** - Testes unitários

## Estrutura do Projeto

```
src/
├── config/
│   └── database.js          # Configuração do banco de dados
├── controllers/
│   ├── UserController.js    # Controlador de usuários
│   ├── CategoryController.js # Controlador de categorias
│   └── ProductController.js  # Controlador de produtos
├── middleware/
│   ├── auth.js              # Middleware de autenticação
│   └── errorHandler.js      # Tratamento de erros
├── models/
│   ├── User.js              # Modelo de usuário
│   ├── Category.js          # Modelo de categoria
│   ├── Product.js           # Modelo de produto
│   └── index.js             # Associações dos modelos
├── routes/
│   ├── userRoutes.js        # Rotas de usuários
│   ├── categoryRoutes.js    # Rotas de categorias
│   ├── productRoutes.js     # Rotas de produtos
│   └── index.js             # Arquivo principal de rotas
├── validators/
│   ├── userValidator.js     # Validações de usuário
│   ├── categoryValidator.js # Validações de categoria
│   └── productValidator.js  # Validações de produto
├── app.js                   # Configuração da aplicação
└── server.js               # Servidor principal
```

## Configuração do Ambiente

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   Copie o arquivo `.env.example` para `.env` e configure as variáveis:
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=projeto_backend
   DB_USERNAME=root
   DB_PASSWORD=
   JWT_SECRET=seu_jwt_secret_aqui
   PORT=3000
   ```

3. **Configurar banco de dados:**
   ```bash
   # Executar migrations
   npm run db:migrate
   
   # Executar seeders (dados de exemplo)
   npm run db:seed
   ```

4. **Executar a aplicação:**
   ```bash
   # Desenvolvimento
   npm run dev
   
   # Produção
   npm start
   ```

## Endpoints da API

### Usuários

#### POST /v1/user
Criar um novo usuário

**Request Body:**
```json
{
  "firstname": "João",
  "surname": "Silva",
  "email": "joao@email.com",
  "password": "123456",
  "confirmPassword": "123456"
}
```

#### GET /v1/user/:id
Obter usuário por ID

#### PUT /v1/user/:id
Atualizar usuário (requer autenticação)

#### DELETE /v1/user/:id
Deletar usuário (requer autenticação)

#### POST /v1/user/token
Gerar token JWT

**Request Body:**
```json
{
  "email": "joao@email.com",
  "password": "123456"
}
```

### Categorias

#### GET /v1/category/search
Listar categorias com filtros

**Query Parameters:**
- `limit` - Número de itens por página (default: 12, -1 para todos)
- `page` - Página atual (default: 1)
- `fields` - Campos a serem retornados (ex: "name,slug")
- `use_in_menu` - Filtrar por categorias do menu (true/false)

#### GET /v1/category/:id
Obter categoria por ID

#### POST /v1/category
Criar categoria (requer autenticação)

#### PUT /v1/category/:id
Atualizar categoria (requer autenticação)

#### DELETE /v1/category/:id
Deletar categoria (requer autenticação)

### Produtos

#### GET /v1/product/search
Listar produtos com filtros

**Query Parameters:**
- `limit` - Número de itens por página
- `page` - Página atual
- `fields` - Campos a serem retornados
- `match` - Buscar por nome ou descrição
- `category_ids` - Filtrar por IDs de categorias (ex: "1,2,3")
- `price-range` - Faixa de preços (ex: "100-200")

#### GET /v1/product/:id
Obter produto por ID

#### POST /v1/product
Criar produto (requer autenticação)

#### PUT /v1/product/:id
Atualizar produto (requer autenticação)

#### DELETE /v1/product/:id
Deletar produto (requer autenticação)

## Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Para acessar endpoints protegidos:

1. Faça login em `/v1/user/token` para obter o token
2. Inclua o token no header Authorization: `Bearer <token>`

## Códigos de Status HTTP

- **200 OK** - Requisição bem-sucedida
- **201 Created** - Recurso criado com sucesso
- **204 No Content** - Requisição bem-sucedida sem retorno
- **400 Bad Request** - Dados inválidos
- **401 Unauthorized** - Não autorizado
- **404 Not Found** - Recurso não encontrado
- **500 Internal Server Error** - Erro interno do servidor

## Testes

Execute os testes com:
```bash
npm test
```

## Health Check

Verifique se a API está funcionando:
```
GET /health
```

## Estrutura do Banco de Dados

### Tabelas

1. **users** - Usuários do sistema
2. **categories** - Categorias de produtos
3. **products** - Produtos
4. **product_images** - Imagens dos produtos
5. **product_options** - Opções dos produtos (tamanho, cor, etc.)
6. **product_categories** - Associação produtos-categorias (N:M)

### Relacionamentos

- Produto → Imagens (1:N)
- Produto → Opções (1:N)
- Produto ↔ Categoria (N:M)

## Exemplo de Uso

1. **Criar usuário:**
```bash
curl -X POST http://localhost:3000/v1/user \
  -H "Content-Type: application/json" \
  -d '{"firstname":"João","surname":"Silva","email":"joao@email.com","password":"123456","confirmPassword":"123456"}'
```

2. **Fazer login:**
```bash
curl -X POST http://localhost:3000/v1/user/token \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@email.com","password":"123456"}'
```

3. **Listar produtos:**
```bash
curl -X GET "http://localhost:3000/v1/product/search?limit=10&page=1"
```

## Considerações de Segurança

- Senhas são hasheadas usando bcrypt
- JWT tokens para autenticação
- Validação de dados em todos os endpoints
- Middleware de segurança (helmet)
- CORS configurado
- Tratamento de erros padronizado

## Melhorias Futuras

- [ ] Upload real de imagens
- [ ] Cache com Redis
- [ ] Rate limiting
- [ ] Logging estruturado
- [ ] Documentação Swagger
- [ ] Testes de integração
- [ ] CI/CD Pipeline
- [ ] Monitoramento e métricas
