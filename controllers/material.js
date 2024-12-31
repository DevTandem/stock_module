require("dotenv").config()
const { Sequelize, DataTypes, Op } = require('sequelize');
const dbUrl = process.env.DATABASE_URL
const sequelize = new Sequelize(dbUrl);

const MaterialModel = require("../db/models/material")
const material = MaterialModel(sequelize , DataTypes)