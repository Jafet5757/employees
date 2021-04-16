const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const Parser = require("body-parser").urlencoded({ extended: false });

//Routes
const rutas = require('./routes/principal');

//Settings
app.set("host", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.set("views", path.join(__dirname, "views"));

//Middlewares
app.use("/public", express.static("public"));
app.use(Parser);
app.use(morgan('dev'));
app.use(rutas);

//Server
app.listen(app.get("host"), (req, res) => {
    console.log("Servidor en puerto: " , app.get("host"));
});