import axios from "axios";

export const deletePlaylist = async (playlistId) => {
  const res = await axios.delete(
    `http://localhost:3300/playlists/${playlistId}`
  );
  if (res.status < 399) {
    return res;
  }
};

export const getType = async (param, token) => {
  console.log(param);
  const response = await axios.get(
    `https://api.spotify.com/v1/${param.type}s/${param.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response) return response;
};

export const addToLibrary = async (param) => {
  const response = await axios.post("http://localhost:3300/playlists", param);

  return response;
};

export const getPlayLists = async (id, token) => {
  const response = await axios.get(
    `https://api.spotify.com/v1/playlists/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const signUp = async (user) => {
  const response = await axios.post("http://localhost:3300/register", user);
  return response;
};
export const logIn = async (cred) => {
  const response = await axios.post("http://localhost:3300/login", cred);
  return response;
};

export const getSearch = async (searchUser, token) => {
  const response = await axios.get(
    `https://api.spotify.com/v1/search?q=${searchUser}&type=album,playlist`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response
}