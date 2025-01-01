const express = require("express")
const material_control = require("../controllers/material")

const material_router = express.Router()

material_router.post("/add_material",material_control.addMaterial)

module.exports = material_router