const { body } = require('express-validator');

const userValidation = {
  create: [
    body('firstname')
      .trim()
      .notEmpty()
      .withMessage('O primeiro nome é obrigatório')
      .isLength({ min: 2, max: 50 })
      .withMessage('O primeiro nome deve ter entre 2 e 50 caracteres'),
    
    body('surname')
      .trim()
      .notEmpty()
      .withMessage('O sobrenome é obrigatório')
      .isLength({ min: 2, max: 50 })
      .withMessage('O sobrenome deve ter entre 2 e 50 caracteres'),
    
    body('email')
      .trim()
      .notEmpty()
      .withMessage('O email é obrigatório')
      .isEmail()
      .withMessage('Email deve ter um formato válido')
      .normalizeEmail(),
    
    body('password')
      .isLength({ min: 6 })
      .withMessage('A senha deve ter pelo menos 6 caracteres'),
    
    body('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('As senhas não coincidem');
        }
        return true;
      })
  ],

  update: [
    body('firstname')
      .trim()
      .notEmpty()
      .withMessage('O primeiro nome é obrigatório')
      .isLength({ min: 2, max: 50 })
      .withMessage('O primeiro nome deve ter entre 2 e 50 caracteres'),
    
    body('surname')
      .trim()
      .notEmpty()
      .withMessage('O sobrenome é obrigatório')
      .isLength({ min: 2, max: 50 })
      .withMessage('O sobrenome deve ter entre 2 e 50 caracteres'),
    
    body('email')
      .trim()
      .notEmpty()
      .withMessage('O email é obrigatório')
      .isEmail()
      .withMessage('Email deve ter um formato válido')
      .normalizeEmail()
  ],

  login: [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('O email é obrigatório')
      .isEmail()
      .withMessage('Email deve ter um formato válido')
      .normalizeEmail(),
    
    body('password')
      .notEmpty()
      .withMessage('A senha é obrigatória')
  ]
};

module.exports = { userValidation };
