const { Product, ProductImage, ProductOption, Category, ProductCategory } = require('../models');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');

class ProductController {
  // GET /v1/product/search - Listar produtos com filtros
  async searchProducts(req, res, next) {
    try {
      const {
        limit = 12,
        page = 1,
        fields,
        match,
        category_ids,
        'price-range': priceRange,
        ...options
      } = req.query;

      // Configurar paginação
      const limitValue = parseInt(limit) === -1 ? null : parseInt(limit);
      const offset = limitValue && parseInt(page) > 1 ? (parseInt(page) - 1) * limitValue : 0;

      // Configurar campos a serem retornados
      const attributes = fields ? fields.split(',') : undefined;

      // Configurar filtros
      const where = {};
      
      // Filtro por nome ou descrição
      if (match) {
        where[Op.or] = [
          { name: { [Op.like]: `%${match}%` } },
          { description: { [Op.like]: `%${match}%` } }
        ];
      }

      // Filtro por faixa de preços
      if (priceRange) {
        const [minPrice, maxPrice] = priceRange.split('-').map(p => parseFloat(p));
        if (minPrice !== undefined && maxPrice !== undefined) {
          where.price = {
            [Op.between]: [minPrice, maxPrice]
          };
        }
      }

      // Incluir associações
      const include = [
        {
          model: ProductImage,
          as: 'images',
          attributes: ['id', 'path'],
          where: { enabled: true },
          required: false
        },
        {
          model: ProductOption,
          as: 'options',
          required: false
        },
        {
          model: Category,
          as: 'categories',
          attributes: ['id', 'name', 'slug'],
          through: { attributes: [] },
          required: false
        }
      ];

      // Filtro por categorias
      if (category_ids) {
        const categoryIdsArray = category_ids.split(',').map(id => parseInt(id));
        include[2].where = { id: { [Op.in]: categoryIdsArray } };
        include[2].required = true;
      }

      const { count, rows } = await Product.findAndCountAll({
        where,
        attributes,
        include,
        limit: limitValue,
        offset,
        order: [['created_at', 'DESC']],
        distinct: true
      });

      // Formatear resposta
      const formattedProducts = rows.map(product => {
        const productData = product.toJSON();
        
        // Adicionar category_ids
        productData.category_ids = productData.categories ? 
          productData.categories.map(cat => cat.id) : [];

        // Formatar imagens
        if (productData.images) {
          productData.images = productData.images.map(img => ({
            id: img.id,
            content: `${req.protocol}://${req.get('host')}/${img.path}`
          }));
        }

        return productData;
      });

      res.json({
        data: formattedProducts,
        total: count,
        limit: limitValue || -1,
        page: parseInt(page)
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /v1/product/:id - Obter produto por ID
  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      
      const product = await Product.findByPk(id, {
        include: [
          {
            model: ProductImage,
            as: 'images',
            attributes: ['id', 'path'],
            where: { enabled: true },
            required: false
          },
          {
            model: ProductOption,
            as: 'options',
            required: false
          },
          {
            model: Category,
            as: 'categories',
            attributes: ['id', 'name', 'slug'],
            through: { attributes: [] },
            required: false
          }
        ]
      });
      
      if (!product) {
        return res.status(404).json({
          error: 'Produto não encontrado'
        });
      }

      // Formatar resposta
      const productData = product.toJSON();
      
      // Adicionar category_ids
      productData.category_ids = productData.categories ? 
        productData.categories.map(cat => cat.id) : [];

      // Formatar imagens
      if (productData.images) {
        productData.images = productData.images.map(img => ({
          id: img.id,
          content: `${req.protocol}://${req.get('host')}/${img.path}`
        }));
      }

      res.json(productData);
    } catch (error) {
      next(error);
    }
  }

  // POST /v1/product - Criar produto
  async createProduct(req, res, next) {
    const transaction = await sequelize.transaction();
    
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        await transaction.rollback();
        return res.status(400).json({
          error: 'Dados inválidos',
          details: errors.array()
        });
      }

      const {
        enabled,
        name,
        slug,
        use_in_menu,
        stock,
        description,
        price,
        price_with_discount,
        category_ids,
        images,
        options
      } = req.body;

      // Criar produto
      const product = await Product.create({
        enabled: enabled || false,
        name,
        slug,
        use_in_menu: use_in_menu || false,
        stock: stock || 0,
        description,
        price,
        price_with_discount
      }, { transaction });

      // Associar categorias
      if (category_ids && category_ids.length > 0) {
        const categoryAssociations = category_ids.map(categoryId => ({
          product_id: product.id,
          category_id: categoryId
        }));
        await ProductCategory.bulkCreate(categoryAssociations, { transaction });
      }

      // Criar imagens (simulação - em produção seria upload real)
      if (images && images.length > 0) {
        const imageRecords = images.map((image, index) => ({
          product_id: product.id,
          enabled: true,
          path: `products/${product.id}/image-${index + 1}.${image.type.split('/')[1]}`
        }));
        await ProductImage.bulkCreate(imageRecords, { transaction });
      }

      // Criar opções
      if (options && options.length > 0) {
        const optionRecords = options.map(option => ({
          product_id: product.id,
          title: option.title,
          shape: option.shape || 'square',
          radius: option.radius || 0,
          type: option.type || 'text',
          values: Array.isArray(option.values) ? option.values.join(',') : option.values
        }));
        await ProductOption.bulkCreate(optionRecords, { transaction });
      }

      await transaction.commit();
      res.status(201).json(product);
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  }

  // PUT /v1/product/:id - Atualizar produto
  async updateProduct(req, res, next) {
    const transaction = await sequelize.transaction();
    
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        await transaction.rollback();
        return res.status(400).json({
          error: 'Dados inválidos',
          details: errors.array()
        });
      }

      const { id } = req.params;
      const {
        enabled,
        name,
        slug,
        use_in_menu,
        stock,
        description,
        price,
        price_with_discount,
        category_ids,
        images,
        options
      } = req.body;

      const product = await Product.findByPk(id);
      
      if (!product) {
        await transaction.rollback();
        return res.status(404).json({
          error: 'Produto não encontrado'
        });
      }

      // Atualizar produto
      await product.update({
        enabled,
        name,
        slug,
        use_in_menu,
        stock,
        description,
        price,
        price_with_discount
      }, { transaction });

      // Atualizar associações de categorias
      if (category_ids) {
        await ProductCategory.destroy({ 
          where: { product_id: id },
          transaction 
        });
        
        if (category_ids.length > 0) {
          const categoryAssociations = category_ids.map(categoryId => ({
            product_id: id,
            category_id: categoryId
          }));
          await ProductCategory.bulkCreate(categoryAssociations, { transaction });
        }
      }

      await transaction.commit();
      res.status(204).send();
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  }

  // DELETE /v1/product/:id - Deletar produto
  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      
      const product = await Product.findByPk(id);
      
      if (!product) {
        return res.status(404).json({
          error: 'Produto não encontrado'
        });
      }

      await product.destroy();
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
