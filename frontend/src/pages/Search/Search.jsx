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
      // creer un fichier api qui sappel getSearch met la ligne 24 a 34 sans oublier de return la res
      // tu auras donc const response = await getSearch(searchUser, token)
      // setDataAlbum(response.data["albums"]);
      //  setDataPlaylist(response.data["playlists"]);
      // ca sera plus concis et plus comprehensible
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${searchUser}&type=album,playlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // creer un fichier key.js ou tu vas mettre tous les string tu auras apres response.data[ALBUMS] par exemple
      setDataAlbum(response.data["albums"]);
      setDataPlaylist(response.data["playlists"]);
    

    } catch (e) {
      console.log(e);
    }
  };

  // const onSubmit = (e) =>{
  //   e.preventDefault();
  //   fetchSearchData();
  // }

  return (
    <div className={styles.search}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchSearchData();
          // quand tu as +1 ligne tu dois creer une fonction tel que onSubmit={onSubmit}
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
