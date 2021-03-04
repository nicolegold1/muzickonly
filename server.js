/* ==== External Modules  ==== */
const express = require("express");
const methodOverride = require("method-override");

/* ==== Internal Modules  ==== */
const db = require("./models");
const controllers = require("./controllers");

/* ==== Instanced Modules  ==== */
const app = express();

/* ==== Configuration  ==== */
const PORT = 4000;
app.set("view engine", "ejs");

/* ==== Middleware ==== */
app.use(express.static(__dirname + '/public'));

//Body Data Middleware
app.use(express.urlencoded({extended: true}));

//methodOverride Middleware
app.use(methodOverride("_method"));

/* ==== Routes/Controllers  ==== */
app.use("/playlists", controllers.playlists);
app.use("/songs", controllers.songs);

// Home Routes
app.get("/", function(req,res){
    res.render("home");
});

/* ==== Server Listener  ==== */
app.listen(process.env.PORT || 3000);