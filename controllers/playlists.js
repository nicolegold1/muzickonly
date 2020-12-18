const express = require("express");
const router = express.Router();

const db = require("../models");

// Starting route is /playlists

/* 
  Restful Routes
    Index - GET - /playlists -> Presentational 
    New - GET - /playlists/new -> Presentational Form
    Create - POST - /playlists -> Functional
    Show - GET - /playlists/index -> Presentation
    Edit - GET - /playlists/index/edit -> Presentational Form
    Update - PUT/PATCH - /playlists/index -> Functional
   Delete - DELETE - /playlists/index -> Functional
*/

// Index - GET - /playlists -> Presentational 
router.get("/", function(req, res){
  //mongoose
  db.Playlist.find({}, function(err, allPlaylists){

    if(err) return res.send(err);

    const context = { playlists: allPlaylists }
    return res.render("playlists/index", context);
  });

});

// New - GET - /playlists/new -> Presentational Form
router.get("/new", function(req, res){
    return res.send("New Playlist Form");
});

// Create - POST - /playlists -> Functional
router.post("/", function(req, res){
    return res.send("Functional Route");
});

// Show - GET - /playlists/index -> Presentation
router.get("/:id", function(req, res){
    res.send("Playlist Show Details");
});

// Edit - GET - /playlists/index/edit -> Presentational Form
router.get("/:id/edit", function(req, res){
    res.send("Playlist Edit Form");
});

// Update - PUT/PATCH - /playlists/index -> Functional
router.put("/:id", function(req, res){
  res.send("Playlist update route");
});

// Delete - DELETE - /playlist/index -> Functional
router.delete("/:id", function(req, res){
  res.send("Deleted Playlist");
});

module.exports = router;