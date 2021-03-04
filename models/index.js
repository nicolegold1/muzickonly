/* === Connect Mongodb === */
const mongoose = require("mongoose");
// url for mongo
const mongoUrl = "mongodb://localhost:27017/playlists"

/* === Mongoose Configurations === */
mongoose.connect( process.env.MONGODB_URI || "mongodb+srv://NicoleG:2021yabb@cluster0.l64xl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" );

mongoose.connection.on("connected", function(){
	console.log("Mongodb Connected!");
});

mongoose.connection.on("disconnected", function(){
	console.log("Mongodb disconnected ...");
});

mongoose.connection.on("error", function(error){
	console.log("Mongodb error!", error);
});

module.exports = {
	Playlist: require("./Playlist"),
	Song: require("./Song")
}