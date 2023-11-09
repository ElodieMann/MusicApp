import ListCard from "../../components/ListCard/ListCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./Search.module.scss";

const Search = ({ token }) => {
  const [searchUser, setSearchUser] = useState("");
  const [dataAlbum, setDataAlbum] = useState([]);
  const [dataPlaylist, setDataPlaylist] = useState([]);

  const categoryData = [
    { name: "Album", playlists: dataAlbum },
    { name: "Playlist", playlists: dataPlaylist },
  ];
  
  useEffect(() => {
    if (token && searchUser) {
      fetchSearchData();
    }
  }, [token, searchUser]);

  const fetchSearchData = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${searchUser}&type=album,playlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataAlbum(response.data["albums"]);
      setDataPlaylist(response.data["playlists"]);
    

    } catch (e) {
      console.log(e);
    }
  };



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
