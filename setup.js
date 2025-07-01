const { sequelize } = require('./src/config/database');
const { exec } = require('child_process');
const util = require('util');

const execAsync = util.promisify(exec);

async function setupProject() {
  console.log('🚀 Iniciando setup do projeto...\n');

  try {
    // Verificar conexão com o banco
    console.log('📡 Testando conexão com o banco de dados...');
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida\n');

    // Executar migrations
    console.log('📦 Executando migrations...');
    await execAsync('npx sequelize-cli db:migrate');
    console.log('✅ Migrations executadas com sucesso\n');

    // Executar seeders
    console.log('🌱 Executando seeders...');
    await execAsync('npx sequelize-cli db:seed:all');
    console.log('✅ Seeders executados com sucesso\n');

    console.log('🎉 Setup concluído! O projeto está pronto para uso.\n');
    console.log('📚 Dados de exemplo criados:');
    console.log('   - Usuário admin: admin@sistema.com / 123456');
    console.log('   - Usuário teste: joao@email.com / 123456');
    console.log('   - Categorias e produtos de exemplo\n');
    console.log('🚀 Execute "npm run dev" para iniciar o servidor');

  } catch (error) {
    console.error('❌ Erro durante o setup:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

// Executar setup se chamado diretamente
if (require.main === module) {
  setupProject();
}

module.exports = setupProject;
