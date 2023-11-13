import axios from "axios";
import Audio from "./Audio";
import AlbumHeader from "./AlbumHeader";
import AlbumTracks from "./AlbumTracks";
import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getType } from "../../services/api";
import styles from "./Album.module.scss";


const Album = ({ token }) => {
  const audioRef = useRef();
  const param = useLocation().state;

  const [dataInfo, setDataInfo] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const data = dataInfo || param;

  useEffect(() => {
    if (!param?.tracks) fetchDataType();
    else setDataInfo(param);
  }, [param]);

  const fetchDataType = async () => {
    try {

      const response = await getType(param, token)

   if (response) 
      setDataInfo(response.data);
    } catch (e) {
      console.log(e);
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

  return (
    <div className={styles.album}>
      <AlbumHeader data={data} />
      <AlbumTracks
        data={data}
        setCurrentTrackIndex={setCurrentTrackIndex}
        togglePlay={togglePlay}
      />
      <Audio
        data={data}
        currentTrackIndex={currentTrackIndex}
        setCurrentTrackIndex={setCurrentTrackIndex}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        togglePlay={togglePlay}
      />
    </div>
  );
};

export default Album;
