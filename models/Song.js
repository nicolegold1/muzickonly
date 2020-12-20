
// require mongoose

const mongoose = require("mongoose");

//Set up schema for validation for each document inside the songs collection

const songSchema = new mongoose.Schema(
{
    title:{ type: String, required: true},
    artist: { type: String, required: true},
    playlist: { type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }
},
{timestamps: true}
);

//create our model based on the schema for db connectio for the collection of the resource

const Song = mongoose.model("Song", songSchema);

module.exports = Song;