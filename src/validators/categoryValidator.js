const { body } = require('express-validator');

const categoryValidation = {
  create: [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('O nome da categoria é obrigatório')
      .isLength({ min: 2, max: 100 })
      .withMessage('O nome da categoria deve ter entre 2 e 100 caracteres'),
    
    body('slug')
      .trim()
      .notEmpty()
      .withMessage('O slug é obrigatório')
      .matches(/^[a-z0-9-]+$/)
      .withMessage('O slug deve conter apenas letras minúsculas, números e hífens'),
    
    body('use_in_menu')
      .optional()
      .isBoolean()
      .withMessage('use_in_menu deve ser um valor booleano')
  ],

  update: [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('O nome da categoria é obrigatório')
      .isLength({ min: 2, max: 100 })
      .withMessage('O nome da categoria deve ter entre 2 e 100 caracteres'),
    
    body('slug')
      .trim()
      .notEmpty()
      .withMessage('O slug é obrigatório')
      .matches(/^[a-z0-9-]+$/)
      .withMessage('O slug deve conter apenas letras minúsculas, números e hífens'),
    
    body('use_in_menu')
      .optional()
      .isBoolean()
      .withMessage('use_in_menu deve ser um valor booleano')
  ]
};

module.exports = { categoryValidation };
