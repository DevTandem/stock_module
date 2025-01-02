require("dotenv").config()
const { Sequelize, DataTypes, Op } = require('sequelize');
const dbUrl = process.env.DATABASE_URL
const sequelize = new Sequelize(dbUrl);
const MaterialModel = require("../db/models/material");
const material = MaterialModel(sequelize , DataTypes)
const warehouse_model = require("../db/models/warehouse_material");
const w_m = warehouse_model(sequelize , DataTypes)

const {initializeDb} = require("../config/db")
const { MongoClient, ObjectId } = require("mongodb")


const { v4: uuidv4 } = require('uuid');


const addMaterial = async (req,res) => {
    const {w_id,material_id,colour} = req.query
    const {in_qty,each_size} = req.body


    if(!w_id || !material_id){
        return res.status(400).json({
            status : 400,
            message : "Warehouse or material not found",
            data : null,
            error : null,
            success : false
        })
    }
    
    try {
        const db = await initializeDb();
        const collection = db.collection("products");
        console.log("material_id",material_id)

        const check_material = await collection.findOne({_id : new ObjectId(material_id)})
        console.log("check_material",check_material)
        if(!check_material){
            return res.status(404).json({
                status : 404,
                message : "Material does not exist",
                data : null,
                error : null,
                success : false
            })
        }

        if(check_material.colour.length && colour){
            const checkcolour = check_material.colour.some(curr_colour => curr_colour == colour)
            if(!checkcolour){
                return res.status(404).json({
                    status : 404,
                    message : "colour does not exist",
                    data : null,
                    error : null,
                    success : false
                })
            }

        }else if(!check_material.colour.length && !colour){
        }
        else{
            return res.status(400).json({
                status : 400,
                message : "colour needed or colour doesn't exist",
                data : null,
                error : null,
                success : false
            })
        }

        if(!in_qty){
            return res.status(400).json({
                status : 400,
                message : "Enter in quantity of material",
                data : null,
                error : null,
                success : false
            })
        }

           //serial id of material
        
        if(check_material.type == "unit"){
            for(var i = 0 ; i<in_qty ; i++){
                const uuid = uuidv4();
                const numericUUID = BigInt(`0x${uuid.replace(/-/g, '')}`);
                const id = numericUUID.toString().slice(0, 10);
                const new_material = await material.create({
                    m_name:check_material.s_name,
                    colour: colour,
                    in_qty: 1,
                    serial_id: id,
                    status: "QC_PASSED",
                    type: check_material.type
                })
                const new_w_m = await w_m.create({
                    serial_id: id,
                    material_id: material_id,
                    w_id: w_id
                })
            }
        }else if(["volume","weight","length","pieces"].includes(check_material.type)){
            
            if(!each_size){
                return res.status(400).json({message: "Enter size of material"})
            }

            for(var i = 0 ; i<in_qty ; i++){
                const uuid = uuidv4();
                const numericUUID = BigInt(`0x${uuid.replace(/-/g, '')}`);
                const id = numericUUID.toString().slice(0, 10);
                const new_material = await material.create({
                    m_name:check_material.s_name,
                    colour: colour,
                    in_qty: each_size,
                    serial_id: id,
                    status: "QC_PASSED",
                    type: check_material.type
                })
                const new_w_m = await w_m.create({
                    serial_id: id,
                    material_id: material_id,
                    w_id: w_id
                })
            }
        }
        else{
            return res.status(400).json({
                status : 400,
                message : "type doesn't exist",
                data : null,
                error : null,
                success : false
            })
        }

        return res.status(200).json({
            status : 200,
            message : "Stock added successfully",
            data : null,
            error : null,
            success : true
        })
        

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 500,
            message : "Internal server error",
            data: null,
            error: error,
            success: false
        });
    }
}

module.exports = {
    addMaterial
}