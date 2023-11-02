import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faArrowLeft,
  faPodcast,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Library.module.scss";

const Library = () => {
  return (
    <div className={styles.library}>
      <div className={styles.header}>
        <p>
          <span>
            <FontAwesomeIcon icon={faPodcast} />
          </span>
          Your Library
        </p>
        <div>
          <button>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>
      </div>

      <div className={styles.btnLibrary}>
        <div>
          <button className={styles.btnData}>Playlists</button>
          <button className={styles.btnData}>Songs</button>
        </div>

        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>

      <div className={styles.grid}>
      <div className={styles.gridLibrary}>
          <div>Title</div>
          <div>Date Added</div>
      </div>

      </div>
    </div>
  );
};

export default Library;
