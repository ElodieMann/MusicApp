import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "./Card.module.scss";

const Card = ({ category}) => {

  return (
    <div className={styles.listCard}>
      <h1 className={styles.titleCategory}>{category?.name}</h1>
      <div className={styles.containerPlaylist}>
        {category?.playlists?.map((data) => (
          <div className={styles.card}>
            <Link to={data.id ? `/search/${data.id}` : '/search'} state={data} key={data.id}>
              <img className={styles.imgHome} src={data?.images?.[0]?.url || data?.album?.images?.[0]?.url} alt={data.name} />
              <p>{data.name}</p>
              <p className={styles.musicapp}>
                By MusicApp
                <span>
                  <FontAwesomeIcon icon={faMusic} />{" "}
                </span>
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
