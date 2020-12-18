/* ==== External Modules  ==== */
const express = require("express");
const methodOverride = require("method-override");

/* ==== Internal Modules  ==== */
const controllers = require("./controllers");

/* ==== Instanced Modules  ==== */
const app = express();

/* ==== Configuration  ==== */
const PORT = 4000;
app.set("view engine", "ejs");

/* ==== Middleware ==== */
app.use(epxress.static(__dirname + '/public'));

//Body Data Middleware
app.use(express.urlencoded({extended: true}));

//methodOverride Middleware
app.use(methodOverride("_method"));

/* ==== Routes/Controllers  ==== */
// Home Routes
app.get("/", function(req,res){
    res.render("home");
});

/* ==== Server Listener  ==== */
app.listen(PORT, function(){
    console.log(`MuzickOnly is live at http://localhost:${PORT}/`)
});