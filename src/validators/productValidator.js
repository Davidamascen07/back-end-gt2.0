const { body } = require('express-validator');

const productValidation = {
  create: [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('O nome do produto é obrigatório')
      .isLength({ min: 2, max: 255 })
      .withMessage('O nome do produto deve ter entre 2 e 255 caracteres'),
    
    body('slug')
      .trim()
      .notEmpty()
      .withMessage('O slug é obrigatório')
      .matches(/^[a-z0-9-]+$/)
      .withMessage('O slug deve conter apenas letras minúsculas, números e hífens'),
    
    body('price')
      .isFloat({ min: 0 })
      .withMessage('O preço deve ser um número maior que zero'),
    
    body('price_with_discount')
      .isFloat({ min: 0 })
      .withMessage('O preço com desconto deve ser um número maior ou igual a zero'),
    
    body('stock')
      .optional()
      .isInt({ min: 0 })
      .withMessage('O estoque deve ser um número inteiro maior ou igual a zero'),
    
    body('enabled')
      .optional()
      .isBoolean()
      .withMessage('enabled deve ser um valor booleano'),
    
    body('use_in_menu')
      .optional()
      .isBoolean()
      .withMessage('use_in_menu deve ser um valor booleano'),
    
    body('category_ids')
      .optional()
      .isArray()
      .withMessage('category_ids deve ser um array'),
    
    body('category_ids.*')
      .optional()
      .isInt()
      .withMessage('Cada ID de categoria deve ser um número inteiro'),
    
    body('description')
      .optional()
      .trim()
      .isLength({ max: 1000 })
      .withMessage('A descrição deve ter no máximo 1000 caracteres')
  ],

  update: [
    body('name')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('O nome do produto não pode estar vazio')
      .isLength({ min: 2, max: 255 })
      .withMessage('O nome do produto deve ter entre 2 e 255 caracteres'),
    
    body('slug')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('O slug não pode estar vazio')
      .matches(/^[a-z0-9-]+$/)
      .withMessage('O slug deve conter apenas letras minúsculas, números e hífens'),
    
    body('price')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('O preço deve ser um número maior que zero'),
    
    body('price_with_discount')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('O preço com desconto deve ser um número maior ou igual a zero'),
    
    body('stock')
      .optional()
      .isInt({ min: 0 })
      .withMessage('O estoque deve ser um número inteiro maior ou igual a zero'),
    
    body('enabled')
      .optional()
      .isBoolean()
      .withMessage('enabled deve ser um valor booleano'),
    
    body('use_in_menu')
      .optional()
      .isBoolean()
      .withMessage('use_in_menu deve ser um valor booleano'),
    
    body('category_ids')
      .optional()
      .isArray()
      .withMessage('category_ids deve ser um array'),
    
    body('category_ids.*')
      .optional()
      .isInt()
      .withMessage('Cada ID de categoria deve ser um número inteiro'),
    
    body('description')
      .optional()
      .trim()
      .isLength({ max: 1000 })
      .withMessage('A descrição deve ter no máximo 1000 caracteres')
  ]
};

module.exports = { productValidation };
