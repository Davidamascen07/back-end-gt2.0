const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const { authenticateToken } = require('../middleware/auth');
const { categoryValidation } = require('../validators/categoryValidator');

const router = express.Router();

// GET /v1/category/search - Listar categorias com filtros
router.get('/search', CategoryController.searchCategories);

// GET /v1/category/:id - Obter categoria por ID
router.get('/:id', CategoryController.getCategoryById);

// POST /v1/category - Criar categoria (requer autenticação)
router.post('/', authenticateToken, categoryValidation.create, CategoryController.createCategory);

// PUT /v1/category/:id - Atualizar categoria (requer autenticação)
router.put('/:id', authenticateToken, categoryValidation.update, CategoryController.updateCategory);

// DELETE /v1/category/:id - Deletar categoria (requer autenticação)
router.delete('/:id', authenticateToken, CategoryController.deleteCategory);

module.exports = router;
