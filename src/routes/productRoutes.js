const express = require('express');
const ProductController = require('../controllers/ProductController');
const { authenticateToken } = require('../middleware/auth');
const { productValidation } = require('../validators/productValidator');

const router = express.Router();

// GET /v1/product/search - Listar produtos com filtros
router.get('/search', ProductController.searchProducts);

// GET /v1/product/:id - Obter produto por ID
router.get('/:id', ProductController.getProductById);

// POST /v1/product - Criar produto (requer autenticação)
router.post('/', authenticateToken, productValidation.create, ProductController.createProduct);

// PUT /v1/product/:id - Atualizar produto (requer autenticação)
router.put('/:id', authenticateToken, productValidation.update, ProductController.updateProduct);

// DELETE /v1/product/:id - Deletar produto (requer autenticação)
router.delete('/:id', authenticateToken, ProductController.deleteProduct);

module.exports = router;
