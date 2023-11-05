const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');

router.post('/register', controllers.createUser);
router.post('/login', controllers.loginUser);
router.post("/playlists", controllers.addToLibrary);
router.get("/playlists/:userId", controllers.getAllPlaylistsByUserId);
router.delete('/playlists/:playlistId', controllers.deletePlaylist);



module.exports = router;