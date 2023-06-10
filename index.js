const express = require('express');
const cors = require("cors");
const SpotifyWebApi = require("spotify-web-api-node");
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.json())
app.use(cors())

const songs = {};

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});

// Retrieve an access token
spotifyApi.clientCredentialsGrant()
    .then(data => {
        //console.log(data.body)
        spotifyApi.setAccessToken(data.body["access_token"]);
    })
    .catch(error => {
        console.log("Something went wrong when retrieving an access token", error);
    });

app.get('/songs/:id', (req, res) => {
    spotifyApi.searchTracks('track:' + req.params.id)
        .then(function (data) {
            // songs.push({tracks: data.body.items, album: req.query.album, artist: req.query.artist})
            // console.log(songs)
            console.log(data.body.tracks.items)
            res.status(200).send(data.body.tracks.items)
        }, function (err) {
            console.error(err);
        });
})

app.listen(8006, () => {
    console.log("Listening on 8006")
})
