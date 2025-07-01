const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O nome da categoria é obrigatório'
      },
      len: {
        args: [2, 100],
        msg: 'O nome da categoria deve ter entre 2 e 100 caracteres'
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
  }
}, {
  tableName: 'categories',
  timestamps: true
});

module.exports = Category;
