# 🚀 Guia de Deploy

Este guia fornece instruções para fazer deploy da API E-commerce Backend em diferentes ambientes.

## 📋 Índice

- [Preparação para Deploy](#preparação-para-deploy)
- [Deploy Local](#deploy-local)
- [Deploy em VPS](#deploy-em-vps)
- [Deploy com Docker](#deploy-com-docker)
- [Deploy na Nuvem](#deploy-na-nuvem)
- [Monitoramento](#monitoramento)

---

## 🎯 Preparação para Deploy

### ✅ Checklist Pré-Deploy

- [ ] Todos os testes passando (`npm test`)
- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados configurado
- [ ] JWT_SECRET alterado para produção
- [ ] Logs configurados
- [ ] Backup do banco realizado

### 🔐 Segurança

```bash
# Gere um JWT_SECRET seguro
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Configure no .env de produção
JWT_SECRET=seu_jwt_super_seguro_de_128_caracteres_aqui
```

---

## 🏠 Deploy Local

### Desenvolvimento
```bash
npm run dev
```

### Produção Local
```bash
# Configure ambiente
NODE_ENV=production

# Instale apenas dependências de produção
npm ci --only=production

# Execute migrations
npm run db:migrate

# Inicie o servidor
npm start
```

---

## 🖥️ Deploy em VPS

### 1. Configuração do Servidor

#### Ubuntu/Debian
```bash
# Atualize o sistema
sudo apt update && sudo apt upgrade -y

# Instale Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instale MySQL
sudo apt install mysql-server -y
sudo mysql_secure_installation

# Instale PM2 para gerenciamento de processo
sudo npm install -g pm2
```

### 2. Deploy da Aplicação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/projeto-backend.git
cd projeto-backend

# Instale dependências
npm ci --only=production

# Configure ambiente
cp .env.example .env
nano .env  # Configure as variáveis

# Configure banco
mysql -u root -p -e "CREATE DATABASE projeto_backend;"
npm run db:migrate
npm run db:seed

# Inicie com PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 3. Configuração do PM2

Crie `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'api-ecommerce',
    script: 'src/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    log_file: './logs/combined.log',
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm Z'
  }]
};
```

### 4. Nginx Reverse Proxy

```nginx
# /etc/nginx/sites-available/api-ecommerce
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Ative o site
sudo ln -s /etc/nginx/sites-available/api-ecommerce /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 5. SSL com Let's Encrypt

```bash
# Instale Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtenha certificado SSL
sudo certbot --nginx -d seu-dominio.com

# Configure renovação automática
sudo crontab -e
# Adicione: 0 12 * * * /usr/bin/certbot renew --quiet
```

---

## 🐳 Deploy com Docker

### 1. Dockerfile

```dockerfile
# Multi-stage build
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS runtime

# Instale dumb-init para manejo de sinais
RUN apk add --no-cache dumb-init

# Crie usuário não-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

WORKDIR /app

# Copie arquivos
COPY --from=builder /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs . .

# Configure usuário
USER nodejs

# Exponha porta
EXPOSE 3000

# Configure entrada
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "src/server.js"]
```

### 2. Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=mysql
      - DB_NAME=projeto_backend
      - DB_USERNAME=root
      - DB_PASSWORD=password123
      - JWT_SECRET=seu_jwt_secret_aqui
    depends_on:
      - mysql
    restart: unless-stopped
    volumes:
      - ./logs:/app/logs

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password123
      MYSQL_DATABASE: projeto_backend
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - api
    restart: unless-stopped

volumes:
  mysql_data:
```

### 3. Comandos Docker

```bash
# Build e start
docker-compose up -d

# Logs
docker-compose logs -f api

# Parar
docker-compose down

# Rebuild
docker-compose up --build -d
```

---

## ☁️ Deploy na Nuvem

### Heroku

#### 1. Preparação
```bash
# Instale Heroku CLI
npm install -g heroku

# Login
heroku login

# Crie app
heroku create seu-app-nome
```

#### 2. Procfile
```
web: node src/server.js
```

#### 3. Configuração
```bash
# Configure variáveis
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=seu_jwt_secret
heroku config:set DB_HOST=seu_host_mysql

# Deploy
git push heroku main

# Execute migrations
heroku run npm run db:migrate
```

### AWS EC2

#### 1. Lance Instância
- Ubuntu Server 20.04 LTS
- t3.micro (Free Tier)
- Configure Security Groups (portas 22, 80, 443)

#### 2. Configuração
```bash
# Conecte via SSH
ssh -i sua-chave.pem ubuntu@ip-da-instancia

# Siga os passos do "Deploy em VPS"
```

### DigitalOcean

#### 1. Droplet
- Ubuntu 20.04
- Basic plan ($5/mês)
- Configure SSH keys

#### 2. Deploy
```bash
# Use o mesmo processo do VPS
# Configure firewall
ufw allow ssh
ufw allow http
ufw allow https
ufw enable
```

---

## 📊 Monitoramento

### 1. Logs

```javascript
// src/config/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
```

### 2. Health Checks

```javascript
// src/routes/health.js
router.get('/health', async (req, res) => {
  try {
    // Teste banco de dados
    await sequelize.authenticate();
    
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      database: 'connected'
    });
  } catch (error) {
    res.status(503).json({
      status: 'ERROR',
      error: error.message
    });
  }
});
```

### 3. Métricas com PM2

```bash
# Instale PM2 Plus
pm2 install pm2-server-monit

# Configure dashboard
pm2 plus
```

---

## 🔄 CI/CD

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.KEY }}
        script: |
          cd /path/to/app
          git pull origin main
          npm ci --only=production
          npm run db:migrate
          pm2 restart all
```

---

## 🚨 Troubleshooting

### Problemas Comuns

#### Erro de Conexão com Banco
```bash
# Verifique se MySQL está rodando
sudo systemctl status mysql

# Teste conexão
mysql -u root -p -e "SELECT 1"
```

#### Porta em Uso
```bash
# Encontre processo na porta
sudo netstat -tulpn | grep :3000

# Mate processo
sudo kill -9 PID
```

#### Memória Insuficiente
```bash
# Configure swap
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Logs Úteis
```bash
# PM2 logs
pm2 logs

# Sistema logs
sudo journalctl -u nginx -f

# Aplicação logs
tail -f logs/combined.log
```

---

**🎉 Parabéns! Sua API está em produção!**

Para mais ajuda, consulte:
- [Documentação do PM2](https://pm2.keymetrics.io/)
- [Guias do DigitalOcean](https://www.digitalocean.com/community/tutorials)
- [AWS Documentation](https://docs.aws.amazon.com/)
