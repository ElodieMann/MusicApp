import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faArrowLeft,
  faPodcast,
  faMagnifyingGlass,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Library.module.scss";
import { Link } from "react-router-dom";

import axios from "axios";

const Library = ({ userIdStorage }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPlaylist();
  }, []);

  const getPlaylist = async () => {
    try {
      const userId = userIdStorage;
      const response = await axios.get(
        `http://localhost:3300/playlists/${userId}`
      );
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = `0${month}`;
    }

    if (day < 10) {
      day = `0${day}`;
    }

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  
  const deletePlaylist = async (playlistId) => {
    try {
      await axios.delete(`http://localhost:3300/playlists/${playlistId}`);
      getPlaylist(); // Rafraîchit la liste des playlists après la suppression
    } catch (error) {
      console.error(error);
    }
  };
  
  

  return (
    <div className={styles.library}>
      <div className={styles.header}>
        <p>
          <span>
            <FontAwesomeIcon icon={faPodcast} />
          </span>
          Your Library
        </p>
   
      </div>


      <div className={styles.grid}>
        <div className={styles.gridLibrary}>
          <div>Title</div>
          <div>Date Added</div>
          <div>Remove</div>
        </div>
        {data?.map((item) => (
          <Link
            to={item.data.id ? `/search/${item.data.id}` : "/search"}
            state={item.data}
            key={item.data.id}
          >
            <div className={styles.gridRow} key={item.id}>
              <div className={`${styles.gridItem}`}>
                <img
                  className={styles.imgItem}
                  src={item?.data?.images?.[0]?.url}
                  alt={item?.data?.name}
                />
                {item?.track?.name || item?.name}
                <div className={`${styles.gridItem}`}>{item?.data?.name}</div>
              </div>

              <div>{formatDate(item.createddate)}</div>
              <button onClick={() => deletePlaylist(item.id)}><FontAwesomeIcon style={{fontSize: '0.8rem'}} icon={faTrash} /></button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Library;
