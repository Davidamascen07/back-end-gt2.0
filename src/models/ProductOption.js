const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ProductOption = sequelize.define('ProductOption', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O título da opção é obrigatório'
      }
    }
  },
  shape: {
    type: DataTypes.ENUM('square', 'circle'),
    allowNull: false,
    defaultValue: 'square'
  },
  radius: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: {
        args: 0,
        msg: 'O radius deve ser maior ou igual a zero'
      }
    }
  },
  type: {
    type: DataTypes.ENUM('text', 'color'),
    allowNull: false,
    defaultValue: 'text'
  },
  values: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Os valores da opção são obrigatórios'
      }
    }
  }
}, {
  tableName: 'product_options',
  timestamps: false
});

// Método para converter valores de string para array
ProductOption.prototype.getValuesArray = function() {
  return this.values ? this.values.split(',').map(v => v.trim()) : [];
};

// Método para converter array para string
ProductOption.prototype.setValuesArray = function(valuesArray) {
  this.values = Array.isArray(valuesArray) ? valuesArray.join(',') : '';
};

module.exports = ProductOption;
