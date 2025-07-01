# 🧪 Exemplos de Requisições - Thunder Client / Postman

## 📋 Coleção de Testes

### 1. 🔐 Autenticação

#### Login Admin
```http
POST http://localhost:3000/v1/user/token
Content-Type: application/json

{
  "email": "admin@sistema.com",
  "password": "123456"
}
```

#### Login Usuário Normal
```http
POST http://localhost:3000/v1/user/token
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "123456"
}
```

---

### 2. 👤 Usuários

#### Criar Usuário
```http
POST http://localhost:3000/v1/user
Content-Type: application/json

{
  "firstname": "Maria",
  "surname": "Santos",
  "email": "maria@teste.com",
  "password": "123456",
  "confirmPassword": "123456"
}
```

#### Obter Usuário
```http
GET http://localhost:3000/v1/user/1
```

#### Atualizar Usuário (⚠️ Requer Token)
```http
PUT http://localhost:3000/v1/user/2
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "firstname": "Maria Atualizada",
  "surname": "Santos Silva",
  "email": "maria.nova@teste.com"
}
```

---

### 3. 🏷️ Categorias

#### Listar Todas
```http
GET http://localhost:3000/v1/category/search
```

#### Listar com Paginação
```http
GET http://localhost:3000/v1/category/search?limit=2&page=1
```

#### Filtrar Campos
```http
GET http://localhost:3000/v1/category/search?fields=id,name,slug
```

#### Apenas Categorias do Menu
```http
GET http://localhost:3000/v1/category/search?use_in_menu=true
```

#### Obter Categoria por ID
```http
GET http://localhost:3000/v1/category/1
```

#### Criar Categoria (⚠️ Requer Token)
```http
POST http://localhost:3000/v1/category
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "name": "Calçados Esportivos",
  "slug": "calcados-esportivos",
  "use_in_menu": true
}
```

#### Atualizar Categoria (⚠️ Requer Token)
```http
PUT http://localhost:3000/v1/category/1
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "name": "Tênis Atualizado",
  "slug": "tenis-atualizado",
  "use_in_menu": false
}
```

---

### 4. 🛍️ Produtos

#### Listar Todos
```http
GET http://localhost:3000/v1/product/search
```

#### Buscar por Nome
```http
GET http://localhost:3000/v1/product/search?match=Nike
```

#### Filtrar por Categoria
```http
GET http://localhost:3000/v1/product/search?category_ids=1
```

#### Filtrar por Múltiplas Categorias
```http
GET http://localhost:3000/v1/product/search?category_ids=1,2,3
```

#### Filtrar por Preço
```http
GET http://localhost:3000/v1/product/search?price-range=50-150
```

#### Busca Complexa
```http
GET http://localhost:3000/v1/product/search?match=Adidas&category_ids=2&price-range=70-100&limit=5
```

#### Obter Produto por ID
```http
GET http://localhost:3000/v1/product/1
```

#### Criar Produto Simples (⚠️ Requer Token)
```http
POST http://localhost:3000/v1/product
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "enabled": true,
  "name": "Tênis de Corrida XYZ",
  "slug": "tenis-corrida-xyz",
  "use_in_menu": false,
  "stock": 25,
  "description": "Tênis ideal para corrida com amortecimento extra",
  "price": 199.90,
  "price_with_discount": 179.90,
  "category_ids": [1, 3]
}
```

#### Criar Produto Completo (⚠️ Requer Token)
```http
POST http://localhost:3000/v1/product
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "enabled": true,
  "name": "Camiseta Premium Sport",
  "slug": "camiseta-premium-sport",
  "use_in_menu": false,
  "stock": 50,
  "description": "Camiseta premium para atividades esportivas, tecido respirável",
  "price": 129.90,
  "price_with_discount": 99.90,
  "category_ids": [2, 3],
  "images": [
    {
      "type": "image/jpg",
      "content": "data:image/jpeg;base64,exemplo_base64_aqui"
    },
    {
      "type": "image/png", 
      "content": "data:image/png;base64,exemplo_base64_aqui"
    }
  ],
  "options": [
    {
      "title": "Tamanho",
      "shape": "square",
      "radius": 4,
      "type": "text",
      "values": ["PP", "P", "M", "G", "GG", "XGG"]
    },
    {
      "title": "Cor",
      "shape": "circle",
      "radius": 0,
      "type": "color", 
      "values": ["#000000", "#FFFFFF", "#FF0000", "#0000FF"]
    },
    {
      "title": "Material",
      "shape": "square",
      "radius": 8,
      "type": "text",
      "values": ["100% Algodão", "Poliéster", "Misto"]
    }
  ]
}
```

#### Atualizar Produto (⚠️ Requer Token)
```http
PUT http://localhost:3000/v1/product/1
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "name": "Tênis Nike Air Max Atualizado",
  "price": 319.90,
  "price_with_discount": 279.90,
  "stock": 75,
  "enabled": true
}
```

---

### 5. 🔍 Health Check

#### Verificar Status da API
```http
GET http://localhost:3000/health
```

---

## 🎯 Sequência de Teste Recomendada

1. **Health Check** - Verificar se API está funcionando
2. **Login** - Obter token JWT
3. **Listar Categorias** - Ver dados existentes
4. **Listar Produtos** - Ver dados existentes
5. **Criar Usuário** - Testar validações
6. **Criar Categoria** - Testar autenticação
7. **Criar Produto** - Testar relacionamentos
8. **Testar Filtros** - Validar funcionalidades avançadas

## 📝 Notas Importantes

- **{{token}}** deve ser substituído pelo JWT retornado no login
- **Endpoints protegidos** requerem header Authorization
- **Validações** retornam erro 400 com detalhes
- **IDs inexistentes** retornam erro 404
- **Logs** aparecem no console do servidor

## 🚨 Códigos de Resposta

- **200** - Sucesso com dados
- **201** - Criado com sucesso  
- **204** - Sucesso sem retorno
- **400** - Dados inválidos
- **401** - Não autorizado
- **404** - Não encontrado
- **500** - Erro interno
