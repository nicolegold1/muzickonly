const mongoose = require("mongoose");

//Playlist Schema for validation
const playlistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    mood: { type: String, required: true },
    description: { type: String, required: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }]
  },
  { timestamps: true }
);

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;