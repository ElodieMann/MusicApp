import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { removePlaylist } from "../../redux/playlist";
import { formatDate } from "../../services/helpers";
import { deletePlaylist } from "../../services/api";

import styles from "./Library.module.scss";

const PlaylistLink = ({ item }) => {
  const dispatch = useDispatch();

  const onDeletePlaylist = async (playlistId) => {
    try {
      const res = await deletePlaylist(playlistId);
      if (res.status < 399) {
        dispatch(removePlaylist(playlistId));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
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
        <button onClick={() => onDeletePlaylist(item?.id)}>
          <FontAwesomeIcon style={{ fontSize: "0.8rem" }} icon={faTrash} />
        </button>
      </div>
    </Link>
  );
};

export default PlaylistLink;
