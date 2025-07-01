'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
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
      enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });

    // Adicionar índices
    await queryInterface.addIndex('product_images', ['product_id'], {
      name: 'product_images_product_id_index'
    });
    
    await queryInterface.addIndex('product_images', ['enabled'], {
      name: 'product_images_enabled_index'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_images');
  }
};
