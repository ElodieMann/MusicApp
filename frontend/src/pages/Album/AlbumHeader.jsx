import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faHeartCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { addPlaylist } from "../../redux/playlist";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { randomColor } from "../../services/helpers";
import { addToLibrary } from "../../services/api";
import styles from "./Album.module.scss";

const AlbumHeader = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userId.userId);
  const playlist = useSelector((state) => state.playlist.playlist);
  const log = useSelector((state) => state.userId.isLog);

  const onAddToLibrary = async () => {
    if (!log) {
      navigate("/login");
      return;
    }
    try {
      const playlistData = { data: data, userId: user, id: data.id };
      const response = await addToLibrary(playlistData);

      if (response) {
        const playlistExists = playlist.some(
          (item) => item.userId === user && item.id === response.data.id
        );

        if (!playlistExists) {
          dispatch(addPlaylist(...response.data));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const backgroundColor = randomColor();

  return (
    <div style={{ backgroundColor: backgroundColor }} className={styles.header}>
      <img
        className={styles.imgHeader}
        src={data?.images?.[0]?.url}
        alt={data?.name}
      />
      <div className={styles.headerContain}>
        <p>Playlist</p>
        <p className={styles.playlistTitle}>{data?.name}</p>
        <div className={styles.info}>
          <p>
            <span>
              <FontAwesomeIcon
                style={{ color: "#18813A", marginRight: "5px" }}
                icon={faMusic}
              />
            </span>
            MusicApp &#11824;
          </p>
          <p>{data?.followers?.total} likes &#11824; </p>
          <p>{data?.tracks?.items?.length} songs</p>
        </div>
        <div>
          <button onClick={onAddToLibrary}>
            <FontAwesomeIcon icon={faHeartCirclePlus} /> Save to Your Library
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlbumHeader;
