const app = require('./app');
const { sequelize } = require('./config/database');

const PORT = process.env.PORT || 3000;

// Função para inicializar o servidor
const startServer = async () => {
  try {
    // Sincronizar modelos com o banco de dados
    await sequelize.sync({ force: false });
    console.log('📦 Modelos sincronizados com o banco de dados');

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📖 Documentação disponível em: http://localhost:${PORT}/health`);
      console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Erro ao inicializar o servidor:', error);
    process.exit(1);
  }
};

// Tratamento de erros não capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('Rejeição não tratada:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Exceção não capturada:', error);
  process.exit(1);
});

// Inicializar servidor
startServer();
