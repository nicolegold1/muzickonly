const { request, response } = require("express");
const express = require("express");
const { db } = require("../models/Song");
const router = express.Router();

module.exports = router;

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

router.get("/", function(req, res) {

    db.Song.find({}, function(error, allSong){
        if(error) {
            console.log(error);
            return response.send("Internal Server Error");
        }else {
            const context ={songs: allSong}
            return response.render("song/index", context);
        }
    });
});

// song create - receive data from the new form and create a new song in our playlist
// create -POST -/songs ->functional

router.post("/", function (request , response ){
    

db.Song.create(request.body, function(error, createdSong){
    if(error){
        console.log(error);
        return response.send("Interval Server Error");
    } else {
        console.log("created song", createdSong);
        return response.redirect("/songs");
    }
    });
});

//song show - show a specific song

router.get("/:id", function(request, response) {
    const id =request.params.id;

    db.Song.findbyId(id, function(error,foundSong){

        if(error) {
            console.log(error);
            return response.send("Internal Server Error");
        }else {
            const context = {song: foundSong}

            return response.render("songs/show", context);
        }
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

router.put("/:index", function(request, response){
    const index = request.params.index;
    const newSongData = request.body;

    const songLocation = db.Song.findIndex(function(song){
        return song._id === parseInt(index)
    
    });
    
    db.Song.findByIdAndUpdate(
        id,
    {
        $set: {
            ...request.body
        }
    },
    {new: true,},

    function(error,UpdatedSong){
        if(error){
            console.log(error);
            return response.send("Internal Server Error");
        } else {
            return response.redirect(`/songs/${updatedSong._id}`);
        }
    }
    );
});

module.exports = router;