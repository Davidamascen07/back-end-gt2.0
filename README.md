# 🛍️ E-commerce Backend API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Made with ❤️](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com/seu-usuario)

**API RESTful robusta para sistema de e-commerce com Node.js, Express, MySQL e autenticação JWT**

[🚀 Demo](#-demo) •
[📋 Funcionalidades](#-funcionalidades) •
[⚡ Instalação](#-instalação-rápida) •
[📖 Documentação](#-documentação) •
[🧪 Testes](#-testes)

</div>

---

## 🎯 **Sobre o Projeto**

Esta é uma API REST completa para sistema de e-commerce, desenvolvida seguindo as melhores práticas de arquitetura e segurança. O projeto implementa um CRUD completo para usuários, categorias e produtos, com autenticação JWT, validações robustas e relacionamentos complexos entre entidades.

### 🏗️ **Arquitetura**

```
📁 Estrutura do Projeto
├── 📂 src/
│   ├── 📂 config/          # Configurações do banco de dados
│   ├── 📂 controllers/     # Lógica de negócio
│   ├── 📂 middleware/      # Middlewares personalizados
│   ├── 📂 models/          # Modelos do Sequelize
│   ├── 📂 routes/          # Definição das rotas
│   ├── 📂 validators/      # Validações de entrada
│   ├── 📄 app.js           # Configuração da aplicação
│   └── 📄 server.js        # Ponto de entrada
├── 📂 migrations/          # Migrations do banco
├── 📂 seeders/            # Dados de exemplo
├── 📂 tests/              # Testes automatizados
└── 📄 package.json        # Dependências
```

---

## 🚀 **Demo**

🌐 **API Base URL:** `http://localhost:3000`

### 🔥 **Endpoints Principais**

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `GET` | `/health` | Status da API | ❌ |
| `POST` | `/v1/user/token` | Login | ❌ |
| `GET` | `/v1/product/search` | Listar produtos | ❌ |
| `POST` | `/v1/product` | Criar produto | ✅ |
| `GET` | `/v1/category/search` | Listar categorias | ❌ |

---

## 📋 **Funcionalidades**

### ✅ **Implementado**

- 🔐 **Autenticação JWT** com middleware de segurança
- 👥 **CRUD de Usuários** com hash de senhas (bcrypt)
- 🏷️ **CRUD de Categorias** com filtros avançados
- 🛍️ **CRUD de Produtos** com imagens e opções
- 🔍 **Sistema de Busca** com filtros múltiplos
- 📄 **Paginação** inteligente
- ✅ **Validações** robustas em todos os endpoints
- 🔄 **Relacionamentos** complexos entre entidades
- 🗄️ **Migrations** e seeders automatizados
- 📊 **Logs** estruturados
- 🧪 **Testes** unitários

### 🎯 **Recursos Avançados**

- **Busca Inteligente**: Pesquisa por nome, descrição e filtros
- **Upload de Imagens**: Suporte a base64 para múltiplas imagens
- **Opções de Produto**: Sistema flexível (tamanho, cor, material)
- **Associações N:M**: Produtos podem ter múltiplas categorias
- **Transações**: Operações atômicas para consistência
- **Middleware de Erro**: Tratamento centralizado de erros

---

## ⚡ **Instalação Rápida**

### 📋 **Pré-requisitos**

- ![Node.js](https://img.shields.io/badge/Node.js-v18+-43853D?style=flat-square&logo=node.js&logoColor=white)
- ![MySQL](https://img.shields.io/badge/MySQL-v8.0+-00000F?style=flat-square&logo=mysql&logoColor=white)
- ![npm](https://img.shields.io/badge/npm-v8+-CB3837?style=flat-square&logo=npm&logoColor=white)

### 🚀 **Setup em 3 passos**

```bash
# 1️⃣ Clone o repositório
git clone https://github.com/seu-usuario/projeto-backend.git
cd projeto-backend

# 2️⃣ Instale as dependências
npm install

# 3️⃣ Configure e inicie
cp .env.example .env  # Configure suas variáveis
node create-database.js  # Crie o banco
node setup.js  # Execute migrations e seeders
npm run dev  # 🎉 Servidor rodando!
```

### ⚙️ **Configuração**

Edite o arquivo `.env`:

```env
# 🗄️ Banco de Dados (MySQL/XAMPP)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=projeto_backend
DB_USERNAME=root
DB_PASSWORD=

# 🔐 Segurança
JWT_SECRET=seu_jwt_secret_super_seguro_aqui

# 🚀 Servidor
PORT=3000
NODE_ENV=development
```

---

## 📖 **Documentação**

### 🔐 **Autenticação**

Obtenha um token JWT:

```bash
curl -X POST http://localhost:3000/v1/user/token \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@sistema.com",
    "password": "123456"
  }'
```

Use o token nos endpoints protegidos:
```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 📊 **Exemplos de Uso**

<details>
<summary>👥 <strong>Gerenciar Usuários</strong></summary>

```bash
# Criar usuário
POST /v1/user
{
  "firstname": "João",
  "surname": "Silva", 
  "email": "joao@email.com",
  "password": "123456",
  "confirmPassword": "123456"
}

# Obter usuário
GET /v1/user/1

# Atualizar usuário (requer token)
PUT /v1/user/1
Authorization: Bearer <token>
{
  "firstname": "João Atualizado",
  "surname": "Silva Santos",
  "email": "joao.novo@email.com"
}
```

</details>

<details>
<summary>🏷️ <strong>Gerenciar Categorias</strong></summary>

```bash
# Listar categorias
GET /v1/category/search?limit=10&page=1

# Filtrar categorias do menu
GET /v1/category/search?use_in_menu=true

# Criar categoria (requer token)
POST /v1/category
Authorization: Bearer <token>
{
  "name": "Eletrônicos",
  "slug": "eletronicos",
  "use_in_menu": true
}
```

</details>

<details>
<summary>🛍️ <strong>Gerenciar Produtos</strong></summary>

```bash
# Buscar produtos
GET /v1/product/search?match=Nike&category_ids=1,2&price-range=100-300

# Criar produto completo (requer token)
POST /v1/product
Authorization: Bearer <token>
{
  "enabled": true,
  "name": "Tênis Nike Air Max",
  "slug": "tenis-nike-air-max",
  "stock": 50,
  "description": "Tênis esportivo com tecnologia Air Max",
  "price": 299.90,
  "price_with_discount": 249.90,
  "category_ids": [1, 3],
  "images": [
    {
      "type": "image/jpg",
      "content": "data:image/jpeg;base64,/9j/4AAQ..."
    }
  ],
  "options": [
    {
      "title": "Tamanho",
      "shape": "square",
      "type": "text",
      "values": ["38", "39", "40", "41", "42"]
    }
  ]
}
```

</details>

### 📚 **Documentação Completa**

- 📖 [**API Documentation**](./API_DOCUMENTATION.md) - Documentação completa da API
- 🧪 [**Guia de Testes**](./GUIA_TESTE.md) - Como testar todos os endpoints
- 📝 [**Exemplos de Requisições**](./EXEMPLOS_REQUISICOES.md) - Exemplos práticos
- ✅ [**Checklist de Requisitos**](./CHECKLIST_REQUISITOS.md) - Validação completa

---

## 🧪 **Testes**

### 🏃‍♂️ **Executar Testes**

```bash
# Todos os testes
npm test

# Testes em modo watch
npm run test:watch

# Cobertura de código
npm run test:coverage
```

### 📊 **Coverage**

```
File          | % Stmts | % Branch | % Funcs | % Lines |
--------------|---------|----------|---------|---------|
All files     |   85.2  |   78.3   |   90.1  |   84.7  |
Controllers   |   88.9  |   82.1   |   94.4  |   87.8  |
Models        |   92.3  |   85.7   |   100   |   91.2  |
Middleware    |   78.5  |   69.2   |   83.3  |   76.9  |
```

---

## 🗄️ **Banco de Dados**

### 📊 **Modelo de Dados**

```mermaid
erDiagram
    USERS ||--o{ PRODUCTS : creates
    CATEGORIES ||--o{ PRODUCT_CATEGORIES : has
    PRODUCTS ||--o{ PRODUCT_CATEGORIES : belongs_to
    PRODUCTS ||--o{ PRODUCT_IMAGES : has
    PRODUCTS ||--o{ PRODUCT_OPTIONS : has
    
    USERS {
        int id PK
        string firstname
        string surname
        string email UK
        string password
        datetime created_at
        datetime updated_at
    }
    
    CATEGORIES {
        int id PK
        string name
        string slug UK
        boolean use_in_menu
        datetime created_at
        datetime updated_at
    }
    
    PRODUCTS {
        int id PK
        boolean enabled
        string name
        string slug UK
        boolean use_in_menu
        int stock
        text description
        decimal price
        decimal price_with_discount
        datetime created_at
        datetime updated_at
    }
```

### 🔧 **Comandos Úteis**

```bash
# Resetar banco de dados
npm run db:reset

# Apenas migrations
npm run db:migrate

# Apenas seeders
npm run db:seed

# Reverter última migration
npx sequelize-cli db:migrate:undo
```

---

## 🤝 **Contribuindo**

Contribuições são sempre bem-vindas! 

### 📝 **Como contribuir**

1. 🍴 Faça um Fork do projeto
2. 🌿 Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. ✅ Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push para a branch (`git push origin feature/AmazingFeature`)
5. 🔄 Abra um Pull Request

### 📋 **Diretrizes**

- Siga o padrão de código existente
- Adicione testes para novas funcionalidades
- Atualize a documentação quando necessário
- Use commits semânticos

---

## 📄 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

```
MIT License

Copyright (c) 2025 Projeto Backend

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 👨‍💻 **Autor**

<div align="center">

**Desenvolvido com ❤️ por [David Damasceno](https://github.com/Davidamascen07))**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/seu-usuario)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/seu-perfil)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:seu@email.com)

</div>

---

## 🙏 **Agradecimentos**

- [Digital College](https://github.com/digitalcollegebr) - Especificações do projeto
- [Node.js](https://nodejs.org/) - Runtime JavaScript
- [Express.js](https://expressjs.com/) - Framework web
- [Sequelize](https://sequelize.org/) - ORM para Node.js
- [MySQL](https://www.mysql.com/) - Sistema de banco de dados

---

<div align="center">

**⭐ Se este projeto foi útil para você, considere dar uma estrela!**

**🚀 Happy Coding!**

</div>
