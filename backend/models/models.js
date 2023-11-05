// models.js

const db = require("../config/knex");
const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const createUser = async (
  username,
  firstname,
  lastname,
  email,
  password,
  created_at
) => {
  try {
    const hashedPassword = await hashPassword(password);
    const newUser = await db("users")
      .insert({
        username,
        firstname,
        lastname,
        email,
        password: hashedPassword,
        created_at: created_at || new Date(),
      })
      .returning(["id", "username", "email", "created_at"]);

    return newUser;
  } catch (error) {
    throw error;
  }
};

const findUser = async (email) => {
  try {
    const user = await db("users")
      .where("email", email)
  
      .first();
    if (user) {
      const passwordHash = await db("users")
        .where("email", user.email)

        .select("password")
        .first();
      user.password = passwordHash.password;
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const getAllPlaylistsByUserId = async (userId) => {
  try {
    const playlists = await db.select("id", "data", "createddate")
      .from("playlists")
      .where("userid", userId);
    return playlists;
  } catch (error) {
    throw error;
  }
};



const addToLibrary = async (userId, data) => {
  try {
    const newPlaylist = await db("playlists").insert({
      userid: userId,
      data: JSON.stringify(data),
    }).returning('*');
    return newPlaylist;
  } catch (error) {
    throw error;
  }
};

const deletePlaylist = async (playlistId) => {
  try {
    await db("playlists").where("id", playlistId).del();
    return;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  findUser,
  hashPassword,
  getAllPlaylistsByUserId,
  addToLibrary,
  deletePlaylist
};
