import axios from "axios";
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faHeartCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Album.module.scss";
import { addPlaylist, getPlaylist } from "../../redux/playlist";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { randomColor } from "../../services/helpers";

const AlbumHeader = ({data}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const user = useSelector((state) => state.userId.userId);
    const playlist = useSelector((state) => state.playlist.playlist);
    const log = useSelector((state) => state.userId.isLog);

    const addToLibrary = async () => {
      if(!log) {
        navigate('/login')
        return
      }
        try {
          const response = await axios.post("http://localhost:3300/playlists", {
            data: data,
            userId: user,
            id: data.id,
          });
    
          const playlistExists = playlist.some(
            (item) => item.userId === user && item.id === response.data.id
          );
    
          if (!playlistExists) {
            dispatch(addPlaylist(...response.data));
          }
        } catch (e) {
          console.error(e);
        }
      };

    return (
        <div style={{ backgroundColor: randomColor() }} className={styles.header}>
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
            <button onClick={addToLibrary}>
              <FontAwesomeIcon icon={faHeartCirclePlus} /> Save to Your Library
            </button>
          </div>
        </div>
      </div>
    );
};

export default AlbumHeader;