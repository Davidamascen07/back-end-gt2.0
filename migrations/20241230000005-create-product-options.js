'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_options', {
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
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      shape: {
        type: Sequelize.ENUM('square', 'circle'),
        allowNull: false,
        defaultValue: 'square'
      },
      radius: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      type: {
        type: Sequelize.ENUM('text', 'color'),
        allowNull: false,
        defaultValue: 'text'
      },
      values: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    });

    // Adicionar índice
    await queryInterface.addIndex('product_options', ['product_id'], {
      name: 'product_options_product_id_index'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_options');
  }
};
