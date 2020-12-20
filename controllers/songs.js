const express = require("express");
const router = express.Router();
const db = require("../models");
const { findById } = require("../models/Song");


// Rest Routes
/* 
  * Index - GET - /songs  - Presentational - respond with all songs
  * New - GET - /songs/new  - Presentational Form - a page with a form to create a new song
  * Show - GET - /songs/:id  - Presentational - respond with specific song by id
  * Create - Post - /songs  - Functional - recieve data from new route to create a song
  * Edit - GET - /songs/:id/edit  - Presentational Form - respond with a form prefilled with song data
  * Update - PUT - /songs/:id  - Functional - recieve data from edit to update a specific song
  * Delete - DELETE - /songs/:id  - Functional - Deletes song by id from request
*/

//songs index

//router.get -> req, res === express

router.get("/", function(request, response) {

    db.Song.find({}, function(error, allSong){
        if(error) {
            console.log(error);
            return response.send("Internal Server Error");
        }else {
            const context ={songs: allSong}
            return response.render("songs/index", context);
        }
    });
});

// song new route

router.get("/new", function (request, response) {
    db.Playlist.find({}, function(err,
        foundPlaylists) {
            if(err) return response.send(err);

            const context = {
                playlists: foundPlaylists
            };
            response.render("songs/new", context);
        });
});




// song create - receive data from the new form and create a new song in our playlist
// create -POST -/songs ->functional

router.post("/", function (request , response ){
    
    db.Song.create(request.body, function(error, createdSong){
        if(error) return response.send(error);

            db.Playlist.findById(createdSong.playlist).exec(function(error, foundPlaylist){
                if(error) return response.send(error);

                foundPlaylist.songs.push(createdSong);
                foundPlaylist.save();

                return response.redirect("/songs");
            });
    });

});

//song show - show a specific song

router.get("/:id", function(request, response) {
    db.Song
    .findById(request.params.id)
    .populate("playlist")
    .exec(function (error, foundSong) {
        if (error) return response.send(error);

        const context = { song: foundSong };
        return response.render("songs/show", context);

    });
});

// write Delete route

router.delete("/:id", function(request, response) {
    const id = request.params.id;

    db.Song.findByIdAndDelete(id, function(error, deletedSong) {

        if(error){
            console.log(error);
            return response.send("Internal Server Error");
        } else {
            return response.redirect("/songs");
        }
    });
});

// Write Edit Route
// Edit - GET - /songs/index/edit -> Presentational form
router.get("/:id/edit", function(request, response){
    const id = request.params.id;

    //mongoose . findById(id, function())
    db.Song.findById(id, function(error, foundSong){ 
    
        if(error){
        console.log(error);
        return response.send("Internal Server Error");
        }else {
        const context = {song: foundSong}

        return response.render("songs/edit", context);
    }

    });

});
  

//write update route
//update PUT/PATCH - /songs/index -> functional

router.put("/:id", function(request, response){
    
    db.Song.findByIdAndUpdate(
        request.params.id,
    {
        $set: {
            ...request.body
        }
    },
    {new: true,},

    function(error, updatedSong){
        if(error){
            console.log(error);
            return response.send(error);
        } else {
            return response.redirect(`/songs/${updatedSong._id}`);
        }
    }
    );
});



module.exports = router;