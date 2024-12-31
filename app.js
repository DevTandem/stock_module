const express = require("express");
const { client } = require("./config/db");
const mongoose = require("mongoose");
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

client.connect().then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.log(err);
});

mongoose.connect(process.env.Mongo_URL)
    .then(() => {
        console.log("Connected to Mongo database successfully")
    })
    .catch((err) => {
        console.error("Failed to connect to the database", err)
    });
