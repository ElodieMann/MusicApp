import axios from "axios";
import Audio from "./Audio";
import AlbumHeader from "./AlbumHeader";
import AlbumTracks from "./AlbumTracks";
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
      // fichier APIIIII 
      // const reponse = await getType(param, token)
      const response = await axios.get(
        `https://api.spotify.com/v1/${param.type}s/${param.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // if reponse
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
