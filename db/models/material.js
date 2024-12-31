'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class material extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  material.init({
    m_name: DataTypes.STRING,
    colour: DataTypes.STRING,
    in_qty: DataTypes.INTEGER,
    out_qty: DataTypes.INTEGER,
    serial_id: DataTypes.STRING,
    status: DataTypes.STRING,
    type: DataTypes.STRING,
    sku: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'material',
    timestamps : false
  });
  return material;
};