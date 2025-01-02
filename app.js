const express = require("express");
const { client } = require("./config/db");
const {MongoClient} = require("mongodb");
const app = express();

const material = require("./routes/material")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/main",material)

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

client.connect().then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.log(err);
});

