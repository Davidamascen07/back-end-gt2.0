'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_categories', {
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    // Adicionar chave primária composta
    await queryInterface.addConstraint('product_categories', {
      fields: ['product_id', 'category_id'],
      type: 'primary key',
      name: 'product_categories_pkey'
    });

    // Adicionar índices
    await queryInterface.addIndex('product_categories', ['product_id'], {
      name: 'product_categories_product_id_index'
    });
    
    await queryInterface.addIndex('product_categories', ['category_id'], {
      name: 'product_categories_category_id_index'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_categories');
  }
};
