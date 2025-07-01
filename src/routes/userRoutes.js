const express = require('express');
const UserController = require('../controllers/UserController');
const { authenticateToken } = require('../middleware/auth');
const { userValidation } = require('../validators/userValidator');

const router = express.Router();

// GET /v1/user/:id - Obter usuário por ID
router.get('/:id', UserController.getUserById);

// POST /v1/user - Criar usuário
router.post('/', userValidation.create, UserController.createUser);

// PUT /v1/user/:id - Atualizar usuário (requer autenticação)
router.put('/:id', authenticateToken, userValidation.update, UserController.updateUser);

// DELETE /v1/user/:id - Deletar usuário (requer autenticação)
router.delete('/:id', authenticateToken, UserController.deleteUser);

// POST /v1/user/token - Gerar token JWT
router.post('/token', userValidation.login, UserController.generateToken);

module.exports = router;
