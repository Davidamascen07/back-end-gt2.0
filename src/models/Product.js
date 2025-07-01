const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O nome do produto é obrigatório'
      },
      len: {
        args: [2, 255],
        msg: 'O nome do produto deve ter entre 2 e 255 caracteres'
      }
    }
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'Este slug já está em uso'
    },
    validate: {
      notEmpty: {
        msg: 'O slug é obrigatório'
      },
      isLowercase: {
        msg: 'O slug deve estar em minúsculas'
      },
      is: {
        args: /^[a-z0-9-]+$/,
        msg: 'O slug deve conter apenas letras minúsculas, números e hífens'
      }
    }
  },
  use_in_menu: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: {
        args: 0,
        msg: 'O estoque não pode ser negativo'
      }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: {
        args: 0,
        msg: 'O preço deve ser maior que zero'
      }
    }
  },
  price_with_discount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: {
        args: 0,
        msg: 'O preço com desconto deve ser maior ou igual a zero'
      }
    }
  }
}, {
  tableName: 'products',
  timestamps: true,
  validate: {
    discountNotGreaterThanPrice() {
      if (this.price_with_discount > this.price) {
        throw new Error('O preço com desconto não pode ser maior que o preço original');
      }
    }
  }
});

module.exports = Product;
