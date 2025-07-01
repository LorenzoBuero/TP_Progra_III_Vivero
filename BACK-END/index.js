import envs from "./src/config/envs.js";
import express from "express";

const app = express();

/*
const bodyParser = require("body-parser");
app.use(bodyParser.json());
*/

//require("dotenv").config();
//console.log(process.env);

app.get("/", (req, res) => {
    res.send("Estas en el Main");
});

app.listen(envs.port, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});