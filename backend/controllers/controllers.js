// controllers.js
// nomme le controller userController, dans d autres appli tu pourras avoir 10 controlleurs
const models = require("../models/models");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { username, firstname, lastname, email, password, created_at } =
    req.body;
  try {
    const newUser = await models.createUser(
      username,
      firstname,
      lastname,
      email,
      password,
      created_at
    );
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await models.findUser(email);
  
      if (!user) {
        console.error("User not found");
        return res.status(404).json({ error: "User not found" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (isPasswordValid) {
        console.log("User logged in:", user);
        res.json(user);
      } else {
        console.error("Invalid password");
        return res.status(404).json({ error: "Invalid password" });
      }
    } catch (error) {
      console.error("Error in loginUser controller:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  const getAllPlaylistsByUserId = async (req, res) => {
    const userId = req.params.userId; 
  
    try {
      const playlists = await models.getAllPlaylistsByUserId(userId);
      res.status(200).json(playlists);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

  const addToLibrary = async (req, res) => {
    const { id, userId, data } = req.body;

    try {
      const result = await models.addToLibrary(id, userId, data);
  
      if (result.error) {
        return res.status(400).json({ error: result.error });
      }
        res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  const deletePlaylist = async (req, res) => {
    const playlistId = req.params.playlistId;
    try {
      await models.deletePlaylist(playlistId);
      res.status(200).json({ message: "Playlist deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  };

module.exports = {
  createUser,
  loginUser,
  getAllPlaylistsByUserId,
  addToLibrary,
  deletePlaylist
};
