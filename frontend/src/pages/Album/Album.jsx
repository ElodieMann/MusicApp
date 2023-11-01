import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faClock,
  faChevronLeft,
  faChevronRight,
  faPlay,
  faPause,
  faShuffle,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Album.module.scss";

const Album = () => {
  const data = useLocation().state;
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const audioRef = useRef();
  const [hovered, setHovered] = useState(false);

  const playNext = () => {
    if (isRandom) {
      const randomIndex = Math.floor(Math.random() * data.tracks.items.length);
      setCurrentTrackIndex(randomIndex);
    } else {
      if (currentTrackIndex < data.tracks.items.length - 1) {
        setCurrentTrackIndex(currentTrackIndex + 1);
      } else {
        if (loop) {
          setCurrentTrackIndex(0);
        } else {
          setIsPlaying(false);
        }
      }
    }
  };

  const playPrevious = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeChange = (e) => {
    const timeline = e.currentTarget;
    const rect = timeline.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newTime = (offsetX / rect.width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleLoop = (e) => {
    if (!loop) {
      setLoop(true);
      e.target.style.color = "rgb(24, 129, 58)";
    } else {
      setLoop(false);
      e.target.style.color = "white";
    }
  };

  const toggleRandom = (e) => {
    if (!isRandom) {
      setIsRandom(true);
      e.target.style.color = "rgb(24, 129, 58)";
    } else {
      setIsRandom(false);
      e.target.style.color = "white";
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  function formatClock(totalMilliseconds) {
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }


  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    });

    audio.addEventListener("ended", () => {
      playNext();
    });
  }, [currentTrackIndex, isPlaying, loop, isRandom]);

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.play().catch((err) => console.error("Error while playing:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const randomColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const alpha = 0.1;
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  };

  return (
    <div>
      <div style={{ backgroundColor: randomColor() }} className={styles.header}>
        <img className={styles.imgHeader} src={data.images[0].url} alt={data.name} />
        <div className={styles.headerContain}>
          <p>Playlist</p>
          <p className={styles.playlistTitle}>{data.name}</p>
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
            <p>{data.followers.total} likes &#11824; </p>
            <p>{data.tracks.items.length} songs</p>
          </div>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.gridHeader}>
          <div>#</div>
          <div>Title</div>
          <div>Album</div>
         
          <div>
            <FontAwesomeIcon icon={faClock} />
          </div>
        </div>
        {data.tracks.items.map((item, index) => (
          <div
            className={styles.gridRow}
            key={item.track.id}
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
              <img className={styles.imgItem}  src={item.track.album.images[0].url} alt="" />
              {item.track.name}
            </div>
            <div className={`${styles.gridItem}`}>{item.track.album.name}</div>
            
            <div className={`${styles.gridItem}`}>
              {formatClock(item.track.duration_ms)}
            </div>
          </div>
        ))}
      </div>



      <div className={styles["audio-player"]}>
        <div className={styles["info-player"]}>
      
          <img
            src={data.tracks.items[currentTrackIndex].track.album.images[0].url}
            alt={data.tracks.items[currentTrackIndex].track.album.name}
            className={styles["audio-album-image"]}
          />
          <p className={styles["audio-track-name"]}>
            {data.tracks.items[currentTrackIndex].track.name}
          </p>
        
        </div>
        <div className={styles["player"]}>
        <audio
          ref={audioRef}
          src={data.tracks.items[currentTrackIndex].track.preview_url}
          preload="metadata"
        ></audio>
        <div className={styles["audio-controls"]}>
          <button className={styles["control-button"]} onClick={toggleRandom}>
            <FontAwesomeIcon icon={faShuffle} />
          </button>
          <button className={styles["control-button"]} onClick={playPrevious}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className={styles["control-button"]} onClick={togglePlay}>
            {isPlaying ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </button>
          <button className={styles["control-button"]} onClick={playNext}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>

          <button className={styles["control-button"]} onClick={toggleLoop}>
            <FontAwesomeIcon icon={faRepeat} />
          </button>
        </div>
        <div className={styles["audio-timeline"]}>
          <span>{formatTime(currentTime)}</span>
          <div className={styles["timeline"]} onClick={handleTimeChange}>
            <div className={styles["timeline-background"]}></div>
            <div
              className={styles["timeline-fill"]}
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
          <span>{formatTime(duration - currentTime)}</span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Album;
