import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPodcast } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import PlaylistLink from "./PlaylistLink";

import styles from "./Library.module.scss";


const Library = () => {

  const log = useSelector((state) => state.userId.isLog);
  const playlist = useSelector((state) => state.playlist.playlist);



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
            <PlaylistLink item={item} />
           
          ))}
      </div>
    </div>
  );
};

export default Library;
