'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('materials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      m_name: {
        type: Sequelize.STRING,
        allowNull : false
      },
      colour: {
        type: Sequelize.STRING,
        allowNull : true
      },
      in_qty: {
        type: Sequelize.INTEGER
      },
      out_qty: {
        type: Sequelize.INTEGER,
        defaultValue : 0
      },
      serial_id: {
        type: Sequelize.STRING,
        unique : true,
        references : {
          model : "warehouse_materials",
          key : "serial_id"
        },
        allowNull : false
      },
      status: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      sku: {
        type: Sequelize.STRING,
        defaultValue : null
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('materials');
  }
};