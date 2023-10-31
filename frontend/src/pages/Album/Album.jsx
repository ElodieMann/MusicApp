import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faClock } from "@fortawesome/free-solid-svg-icons";
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
    const timeline = e.target;
    const { left, width } = timeline.getBoundingClientRect();
    const clickX = e.clientX - left;
    const duration = audioRef.current.duration;
    const newTime = (clickX / width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleLoop = () => {
    setLoop(!loop);
  };

  const toggleRandom = () => {
    setIsRandom(!isRandom);
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
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
        <img src={data.images[0].url} alt={data.name} />
        <div className={styles.headerContain}>
          <p>Playlist</p>
          <p  className={styles.playlistTitle}>{data.name}</p>
          <div className={styles.info}>
            <p>
              <span>
                <FontAwesomeIcon style={{color: '#18813A', marginRight: '5px'}}  icon={faMusic} />
              </span>
              MusicApp &#11824;
            </p>
            <p>{data.followers.total} likes &#11824; </p>
            <p>{data.tracks.items.length} songs</p>
          </div>
        </div>
      </div>

      <table>
      <tr className={styles.tableHeader}>
  <th>#</th>
  <th>Title</th>
  <th>Album</th>
  <th>Date added</th>
  <th >
    <FontAwesomeIcon icon={faClock} />
  </th>
</tr>


        {data.tracks.items.map((item, index) => (
          <tr className={styles.id} key={item.track.id}>
            <td onClick={() => setCurrentTrackIndex(index)}>{index + 1}</td>
            <td className={styles.titleTable}>
              <img src={item.track.album.images[0].url} alt="" />
              {item.track.name}
            </td>
            <td>{item.track.album.name}</td>
            <td>{item.added_at}</td>
            <td>{formatClock(item.track.duration_ms)}</td>
          </tr>
        ))}
      </table>

      <div className="audio-player">
        <audio
          ref={audioRef}
          src={data.tracks.items[currentTrackIndex].track.preview_url}
          preload="metadata"
        ></audio>
        <div className="audio-controls">
          <button className="control-button" onClick={toggleLoop}>
            {loop ? "Loop On" : "Loop Off"}
          </button>
          <button className="control-button" onClick={playPrevious}>
            Previous
          </button>
          <button className="control-button" onClick={togglePlay}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button className="control-button" onClick={playNext}>
            Next
          </button>
          <button className="control-button" onClick={toggleRandom}>
            {isRandom ? "Random On" : "Random Off"}
          </button>
        </div>
        <div className="audio-timeline">
          <span>{formatTime(currentTime)}</span>
          <div className="timeline" onClick={handleTimeChange}>
            <div
              className="timeline-fill"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
          <span>{formatTime(duration - currentTime)}</span>
        </div>
      </div>
    </div>
  );
};

export default Album;
