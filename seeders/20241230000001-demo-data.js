'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);

    // Inserir usuários de exemplo
    await queryInterface.bulkInsert('users', [
      {
        firstname: 'Admin',
        surname: 'Sistema',
        email: 'admin@sistema.com',
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        firstname: 'João',
        surname: 'Silva',
        email: 'joao@email.com',
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);

    // Inserir categorias de exemplo
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Tênis',
        slug: 'tenis',
        use_in_menu: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Camisetas',
        slug: 'camisetas',
        use_in_menu: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Ofertas',
        slug: 'ofertas',
        use_in_menu: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Black Friday',
        slug: 'black-friday',
        use_in_menu: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);

    // Inserir produtos de exemplo
    await queryInterface.bulkInsert('products', [
      {
        enabled: true,
        name: 'Tênis Nike Air Max',
        slug: 'tenis-nike-air-max',
        use_in_menu: false,
        stock: 50,
        description: 'Tênis Nike Air Max com tecnologia de amortecimento avançada',
        price: 299.90,
        price_with_discount: 249.90,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        enabled: true,
        name: 'Camiseta Adidas Originals',
        slug: 'camiseta-adidas-originals',
        use_in_menu: false,
        stock: 100,
        description: 'Camiseta casual Adidas Originals 100% algodão',
        price: 89.90,
        price_with_discount: 79.90,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);

    // Inserir imagens de exemplo
    await queryInterface.bulkInsert('product_images', [
      {
        product_id: 1,
        enabled: true,
        path: 'products/1/nike-air-max-1.jpg'
      },
      {
        product_id: 1,
        enabled: true,
        path: 'products/1/nike-air-max-2.jpg'
      },
      {
        product_id: 2,
        enabled: true,
        path: 'products/2/camiseta-adidas-1.jpg'
      }
    ]);

    // Inserir opções de exemplo
    await queryInterface.bulkInsert('product_options', [
      {
        product_id: 1,
        title: 'Tamanho',
        shape: 'square',
        radius: 4,
        type: 'text',
        values: '38,39,40,41,42,43,44'
      },
      {
        product_id: 1,
        title: 'Cor',
        shape: 'circle',
        radius: 0,
        type: 'color',
        values: '#000000,#FFFFFF,#FF0000'
      },
      {
        product_id: 2,
        title: 'Tamanho',
        shape: 'square',
        radius: 4,
        type: 'text',
        values: 'P,M,G,GG'
      }
    ]);

    // Inserir associações produto-categoria
    await queryInterface.bulkInsert('product_categories', [
      {
        product_id: 1,
        category_id: 1
      },
      {
        product_id: 1,
        category_id: 3
      },
      {
        product_id: 2,
        category_id: 2
      },
      {
        product_id: 2,
        category_id: 3
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_categories', null, {});
    await queryInterface.bulkDelete('product_options', null, {});
    await queryInterface.bulkDelete('product_images', null, {});
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.bulkDelete('categories', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
