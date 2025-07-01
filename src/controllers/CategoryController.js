const { Category } = require('../models');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

class CategoryController {
  // GET /v1/category/search - Listar categorias com filtros
  async searchCategories(req, res, next) {
    try {
      const {
        limit = 12,
        page = 1,
        fields,
        use_in_menu
      } = req.query;

      // Configurar paginação
      const limitValue = parseInt(limit) === -1 ? null : parseInt(limit);
      const offset = limitValue && parseInt(page) > 1 ? (parseInt(page) - 1) * limitValue : 0;

      // Configurar campos a serem retornados
      const attributes = fields ? fields.split(',') : undefined;

      // Configurar filtros
      const where = {};
      if (use_in_menu !== undefined) {
        where.use_in_menu = use_in_menu === 'true';
      }

      const { count, rows } = await Category.findAndCountAll({
        where,
        attributes,
        limit: limitValue,
        offset,
        order: [['created_at', 'DESC']]
      });

      res.json({
        data: rows,
        total: count,
        limit: limitValue || -1,
        page: parseInt(page)
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /v1/category/:id - Obter categoria por ID
  async getCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      
      const category = await Category.findByPk(id);
      
      if (!category) {
        return res.status(404).json({
          error: 'Categoria não encontrada'
        });
      }

      res.json(category);
    } catch (error) {
      next(error);
    }
  }

  // POST /v1/category - Criar categoria
  async createCategory(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Dados inválidos',
          details: errors.array()
        });
      }

      const { name, slug, use_in_menu } = req.body;

      const category = await Category.create({
        name,
        slug,
        use_in_menu: use_in_menu || false
      });

      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }

  // PUT /v1/category/:id - Atualizar categoria
  async updateCategory(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Dados inválidos',
          details: errors.array()
        });
      }

      const { id } = req.params;
      const { name, slug, use_in_menu } = req.body;

      const category = await Category.findByPk(id);
      
      if (!category) {
        return res.status(404).json({
          error: 'Categoria não encontrada'
        });
      }

      await category.update({
        name,
        slug,
        use_in_menu
      });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  // DELETE /v1/category/:id - Deletar categoria
  async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      
      const category = await Category.findByPk(id);
      
      if (!category) {
        return res.status(404).json({
          error: 'Categoria não encontrada'
        });
      }

      await category.destroy();
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
