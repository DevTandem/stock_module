const pg = require("pg")
require("dotenv").config()


const client = new pg.Client({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:process.env.DB_PASSWORD,
    database:"UserModule"
})

const { MongoClient } = require("mongodb");

const connectionString = process.env.Mongo_URL;
const dbName = process.env.MONGO_DB_NAME;

let dbInstance;

async function initializeDb() {
    if (!dbInstance) {
        try {
            const client = new MongoClient(connectionString);
            await client.connect();
            console.log("Connected to MongoDB");
            dbInstance = client.db(dbName);
        } catch (error) {
            console.error("Failed to connect to MongoDB:", error);
            throw error;
        }
    }
    return dbInstance;
}


module.exports = {
    client,
    initializeDb
}