import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPodcast, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { removePlaylist, getPlaylist } from "../../redux/playlist";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../services/helpers";
import styles from "./Library.module.scss";

import axios from "axios";

const Library = () => {
  const dispatch = useDispatch();

  const log = useSelector((state) => state.userId.isLog);
  const playlist = useSelector((state) => state.playlist.playlist);

  const deletePlaylist = async (playlistId) => {
    // les fonctions dans un jsx sont souvent appeler avec 'on' devant onDeletePlaylist et dans le ficher api pareil sans on
    try {
      // ficher API
      // const res = await deletPlaylist(playlistId)
      const res = await axios.delete(
        `http://localhost:3300/playlists/${playlistId}`
      );
      if (res.status < 399) {
        dispatch(removePlaylist(playlistId));
      }
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
        {log &&
          playlist?.map((item) => (
            // tous le link doit etre un composant qui sappel PlaylistLink avec en pro le item
            // <PlaylistLink data={item} />
            <Link
              to={item?.id ? `/search/${item?.id}` : "/search"}
              state={item.data}
              key={item?.id}
            >
              <div className={styles.gridRow} key={item?.data?.id}>
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
                <button onClick={() => deletePlaylist(item?.id)}>
                  <FontAwesomeIcon
                    style={{ fontSize: "0.8rem" }}
                    icon={faTrash}
                  />
                </button>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Library;
