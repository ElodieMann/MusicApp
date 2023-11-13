import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import {
  faChevronLeft,
  faChevronRight,
  faPlay,
  faPause,
  faShuffle,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import { formatTime } from "../../services/helpers";
import styles from "./Album.module.scss";

const Audio = ({
  data,
  currentTrackIndex,
  setCurrentTrackIndex,
  audioRef,
  isPlaying,
  setIsPlaying,
  togglePlay,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const url =
    data?.tracks?.items?.[currentTrackIndex]?.track?.album?.images?.[0]?.url ||
    data?.images?.[0]?.url;
  const previewUrl =
    data?.tracks?.items?.[currentTrackIndex]?.track?.preview_url ||
    data?.tracks?.items?.[currentTrackIndex]?.preview_url;
  const name =
    data?.tracks?.items?.[currentTrackIndex]?.track?.album?.name || data?.name;

  useEffect(() => {
    setAudio();
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    currentAudio();
  }, [currentTrackIndex, isPlaying, loop, isRandom]);

  const setAudio = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.play().catch((err) => console.error("Error while playing:", err));
    } else {
      audio.pause();
    }
  };

  const currentAudio = () => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    });

    audio.addEventListener("ended", () => {
      playNext();
    });
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
      e.target.style.color = "#18813a00";
    } else {
      setLoop(false);
      e.target.style.color = "#FFFFFF";
    }
  };

  const playPrevious = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  };

  const toggleRandom = (e) => {
    if (!isRandom) {
      setIsRandom(true);
      e.target.style.color = "#18813a00";
    } else {
      setIsRandom(false);
      e.target.style.color = "#FFFFFF";
    }
  };

  formatTime();

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

  return (
    <div className={styles["audio-player"]}>
      <div className={styles["info-player"]}>
        <img src={url} alt={name} className={styles["audio-album-image"]} />
        <p className={styles["audio-track-name"]}>
          {data?.tracks?.items?.[currentTrackIndex]?.track?.name || data?.name}
        </p>
      </div>
      <div className={styles["player"]}>
        <audio ref={audioRef} src={previewUrl} preload="metadata"></audio>

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
  );
};

export default Audio;
