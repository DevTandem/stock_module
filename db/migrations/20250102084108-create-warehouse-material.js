'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('warehouse_materials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      serial_id: {
        type: Sequelize.STRING,
        references : {
          model : "materials",
          key : "serial_id"
        },
        unique : true
      },
      material_id: {
        type: Sequelize.STRING
      },
      w_id: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('warehouse_materials');
  }
};