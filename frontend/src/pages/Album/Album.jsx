import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  faHeartCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { addPlaylist, getPlaylist } from "../../redux/playlist";
import { useDispatch, useSelector } from "react-redux";
import { formatClock, randomColor } from "../../services/helpers";
import styles from "./Album.module.scss";


const Album = ({ token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userId.userId)
  const playlist = useSelector((state) => state.playlist.playlist)
  const log = useSelector((state) => state.userId.isLog);



  const param = useLocation().state;
  const audioRef = useRef();

  const [dataInfo, setDataInfo] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [hovered, setHovered] = useState(false);
  
  const data = dataInfo || param;


  useEffect(() => {
    if (!param?.tracks) fetchDataType();
    else setDataInfo(param)
  }, [param]);

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

  const fetchDataType = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/${param.type}s/${param.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDataInfo(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.play().catch((err) => console.error("Error while playing:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrackIndex]);

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


  const addToLibrary = async () => {
    try {
      const response = await axios.post("http://localhost:3300/playlists", {
        data: data,
        userId: user,
        id: data.id
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
    <div className={styles.album}>
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
      <div className={styles.grid}>
        <div className={styles.gridHeader}>
          <div>#</div>
          <div>Title</div>
          <div>Album</div>

          <div>
            <FontAwesomeIcon icon={faClock} />
          </div>
        </div>
        {data?.tracks?.items?.map((item, index) => (
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
              <img
                className={styles.imgItem}
                src={
                  item?.track?.album?.images?.[0]?.url || data?.images?.[0]?.url
                }
                alt=""
              />
              {item?.track?.name || item?.name}
            </div>
            <div className={`${styles.gridItem}`}>
              {item?.track?.album?.name || data?.name}
            </div>

            <div className={`${styles.gridItem}`}>
              {formatClock(item?.track?.duration_ms || item?.duration_ms)}
            </div>
          </div>
        ))}
      </div>

      <div className={styles["audio-player"]}>
        <div className={styles["info-player"]}>
          <img
            src={
              data?.tracks?.items?.[currentTrackIndex]?.track?.album
                ?.images?.[0]?.url || data?.images?.[0]?.url
            }
            alt={
              data?.tracks?.items?.[currentTrackIndex]?.track?.album?.name ||
              data?.name
            }
            className={styles["audio-album-image"]}
          />
          <p className={styles["audio-track-name"]}>
            {data?.tracks?.items?.[currentTrackIndex]?.track?.name ||
              data?.name}
          </p>
        </div>
        <div className={styles["player"]}>
          <audio
            ref={audioRef}
            src={
              data?.tracks?.items?.[currentTrackIndex]?.track?.preview_url ||
              data?.tracks?.items?.[currentTrackIndex]?.preview_url
            }
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
