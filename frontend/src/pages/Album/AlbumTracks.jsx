import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPlay } from "@fortawesome/free-solid-svg-icons";
import { formatClock } from "../../services/helpers";
import styles from "./Album.module.scss";

const AlbumTracks = ({ data, setCurrentTrackIndex, togglePlay }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className={styles.grid}>
      <div className={styles.gridHeader}>
        <div>#</div>
        <div>Title</div>
        <div>Album</div>

        <div>
          <FontAwesomeIcon icon={faClock} />
        </div>
      </div>
      {data?.tracks?.items?.map((item, index) => {
        const img = item?.track?.album?.images?.[0]?.url || data?.images?.[0]?.url;
        const name = item?.track?.album?.name || data?.name;
        return (
          <div
            className={styles.gridRow}
            key={item?.track?.id}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className={`${styles.gridItem} ${styles.id}`}
              onClick={() => setCurrentTrackIndex(index)}
            >
              {hovered === index ? (
                <FontAwesomeIcon onClick={togglePlay} icon={faPlay} />
              ) : (
                index + 1
              )}
            </div>
            <div className={`${styles.gridItem}`}>
              <img className={styles.imgItem} src={img} alt="" />
              {item?.track?.name || item?.name}
            </div>
            <div className={`${styles.gridItem}`}>{name}</div>

            <div className={`${styles.gridItem}`}>
              {formatClock(item?.track?.duration_ms || item?.duration_ms)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AlbumTracks;
