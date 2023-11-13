import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ALBUMS, PLAYLISTS } from "../../config/keys";
import { getSearch } from "../../services/api";
import ListCard from "../../components/ListCard/ListCard";
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
       const response = await getSearch(searchUser, token)
     
      setDataAlbum(response.data[ALBUMS]);
      setDataPlaylist(response.data[PLAYLISTS]);
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetchSearchData();
  };

  return (
    <div className={styles.search}>
      <form onSubmit={onSubmit}>
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
