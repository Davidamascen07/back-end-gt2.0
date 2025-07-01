const mysql = require('mysql2/promise');
require('dotenv').config();

async function createDatabase() {
  console.log('🏗️  Criando banco de dados...');
  
  try {
    // Conectar sem especificar database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    // Criar database se não existir
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'projeto_backend'}\``);
    console.log(`✅ Banco de dados '${process.env.DB_NAME || 'projeto_backend'}' criado/verificado com sucesso!`);
    
    await connection.end();
  } catch (error) {
    console.error('❌ Erro ao criar banco de dados:', error.message);
    console.log('\n💡 Certifique-se que:');
    console.log('   - O XAMPP está rodando');
    console.log('   - O MySQL está ativo no XAMPP Control Panel');
    console.log('   - As credenciais no .env estão corretas');
    throw error;
  }
}

if (require.main === module) {
  createDatabase();
}

module.exports = createDatabase;
