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

  const playlist = useSelector((state) => state.playlist.playlist);

  const deletePlaylist = async (playlistId) => {
    try {
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
        {playlist?.map((item) => (
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
