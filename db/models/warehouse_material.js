'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class warehouse_material extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  warehouse_material.init({
    serial_id: DataTypes.STRING,
    material_id: DataTypes.INTEGER,
    w_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'warehouse_material',
    timestamps : false
  });
  return warehouse_material;
};