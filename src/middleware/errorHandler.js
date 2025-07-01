const { ValidationError, UniqueConstraintError, ForeignKeyConstraintError } = require('sequelize');

const errorHandler = (error, req, res, next) => {
  console.error('Erro capturado:', error);

  // Erro de validação do Sequelize
  if (error instanceof ValidationError) {
    const errors = error.errors.map(err => ({
      field: err.path,
      message: err.message
    }));
    
    return res.status(400).json({
      error: 'Dados inválidos',
      details: errors
    });
  }

  // Erro de chave única
  if (error instanceof UniqueConstraintError) {
    const field = error.errors[0]?.path || 'campo';
    return res.status(400).json({
      error: `${field} já está em uso`
    });
  }

  // Erro de chave estrangeira
  if (error instanceof ForeignKeyConstraintError) {
    return res.status(400).json({
      error: 'Referência inválida - registro relacionado não encontrado'
    });
  }

  // Erro personalizado com status
  if (error.status) {
    return res.status(error.status).json({
      error: error.message
    });
  }

  // Erro interno do servidor
  return res.status(500).json({
    error: 'Erro interno do servidor'
  });
};

// Middleware para capturar rotas não encontradas
const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada'
  });
};

module.exports = { errorHandler, notFoundHandler };
