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
    return res.render("playlists/new");
});

// Create - POST - /playlists -> Functional
router.post("/", function(req, res){
    //mongoose
    db.Playlist.create(req.body, function(err, createdPlaylist){

      if(err) return res.send(err);

      return res.redirect("/playlists");
    });
});

// Show - GET - /playlists/index -> Presentation
router.get("/:id", function(req, res){
    //mongoose
    db.Playlist
    .findById(req.params.id)
    .populate("songs")
    .exec(function(err, foundPlaylist){

      if(err) return res.send(err)

      const context = { playlist: foundPlaylist };
      return res.render("playlists/show", context);
    });
});

// Edit - GET - /playlists/index/edit -> Presentational Form
router.get("/:id/edit", function(req, res){
  const id = req.params.id;
    //mongoose
    db.Playlist.findById(id, function(err, foundPlaylist){

      if(err) return res.send(err);

      const context = { playlist: foundPlaylist };
      return res.render("playlists/edit", context)
    });
});

// Update - PUT/PATCH - /playlists/index -> Functional
router.put("/:id", function(req, res){
  //mongoose
  db.Playlist.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        ...req.body
      }
    },
    { new: true},
    function(err, updatedPlaylist){
      
      if(err) return res.send(err);

      return res.redirect(`/playlists/${updatedPlaylist._id}`);
    }
  );
});

// Delete - DELETE - /playlist/index -> Functional
router.delete("/:id", function(req, res){
  //mongoose
  db.Playlist.findByIdAndDelete(req.params.id, function(err, deletedPlaylist){
    
    if(err) return res.send(err);
    
    db.Song.remove({playlist: deletedPlaylist._id}, function(err, deletedSongs){
      if(err) return res.send(err);

      return res.redirect("/playlists")
    });

  });
});

module.exports = router;