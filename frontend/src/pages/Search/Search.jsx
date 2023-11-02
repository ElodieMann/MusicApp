import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ListCard from "../../components/ListCard/ListCard";
import styles from "./Search.module.scss";

const Search = ({ token }) => {
  const [searchUser, setSearchUser] = useState("");
  const categories = ["album", "artist", "playlist", "track"];
  const [dataAlbum, setDataAlbum] = useState([]);
  const [dataArtist, setDataArtist] = useState([]);
  const [dataPlaylist, setDataPlaylist] = useState([]);
  const [dataTrack, setDataTrack] = useState([]);

  useEffect(() => {
    if (token && searchUser) {
      fetchSearchData();
    }
  }, [token, searchUser]);

  const fetchSearchData = async () => {
    for (const category of categories) {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/search?q=${searchUser}&type=${category}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (category === "album") {
          setDataAlbum(response.data);
        } else if (category === "artist") {
          setDataArtist(response.data);
        } else if (category === "playlist") {
          setDataPlaylist(response.data);
        } else if (category === "track") {
          setDataTrack(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const categoryData = [
    { name: "Album", playlists: dataAlbum?.albums?.items },
    { name: "Artist", playlists: dataArtist?.artists?.items },
    { name: "Playlist", playlists: dataPlaylist?.playlists?.items },
    { name: "Track", playlists: dataTrack?.tracks?.items },
  ];

console.log(dataAlbum?.albums?.items);

  return (
    <div className={styles.search}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchSearchData();
        }}
      >
        <p>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </p>
        <input
          type="text"
          placeholder="What do you want to listen to?"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
        />
      </form>

      <ListCard categoryData={categoryData} />
    </div>
  );
};

export default Search;
