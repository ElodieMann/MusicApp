// Home.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import styles from './Home.module.scss'

const Home = () => {
  const popularRadio = [
    "37i9dQZF1E4qz5vS55UCfv",
    "37i9dQZF1E4lpj4fb7A9Nr",
    "37i9dQZF1E4FhRRLh0mmxG",
    "37i9dQZF1E4qSGMS0LCDb5",
    "37i9dQZF1E4wmWec21cCcJ",
    "37i9dQZF1E4uKNAcTu4q5q",
    "37i9dQZF1E4wMmDGhc9aS2",
    "37i9dQZF1E4kpnm6PFddQq",
    "37i9dQZF1E4rm3VpkGRopl",
    "37i9dQZF1E4CuBuNYA6Ztj",
  ];

  const recommendedRadio = [
    "37i9dQZF1E4DA4NMMNMQ1j",
    "37i9dQZF1E4AJ7APsyMVAt",
    "37i9dQZF1E4nqrwpUzdAQS",
    "37i9dQZF1E4BbZOu2w1hAZ",
    "37i9dQZF1E4pXRMmtPF6Pg",
  ];

  const latinFavorite = [
    "37i9dQZF1DX8sljIJzI0oo",
    "37i9dQZF1DWVxf0LotrLLG",
    "37i9dQZF1DX1hVRardJ30X",
    "37i9dQZF1DX7qRKBHjmYIE",
    "37i9dQZF1DWZoF06RIo9el",
    "37i9dQZF1DX1QnNyJOBQBv",
    "37i9dQZF1DXdWmNjHAJIwP",
    "37i9dQZF1DWWWpEY2WZLnS",
    "37i9dQZF1DWY7IeIP1cdjF",
  ];

  const [token, setToken] = useState("");
  const [dataPopular, setDataPopular] = useState([]);
  const [dataRecommended, setDataRecommended] = useState([]);
  const [dataLatin, setDataLatin] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id: "a0daa57c8ea4404caae7e7a8a42df5e1",
          client_secret: "ba77fd9929924e868318091cf91f53d9",
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setToken(response.data.access_token);

      fetchDataForCategory(popularRadio, setDataPopular, response.data.access_token);
      fetchDataForCategory(recommendedRadio, setDataRecommended, response.data.access_token);
      fetchDataForCategory(latinFavorite, setDataLatin, response.data.access_token);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchDataForCategory = async (categories, setData, token) => {
    for (const id of categories) {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData((prevData) => [...prevData, response.data]);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const renderCategory = (categoryData) => {
    return (
      <div>
        <h1 className={styles.titleCategory}>{categoryData.name}</h1>
        <div className={styles.containerPlaylist}>
          {categoryData.playlists.map((data) => (
            <div className={styles.card}>
              <Link to={data.id} state={data} key={data.id}>
                <img  src={data.images[0].url} alt={data.name} />
                <p>{data.name}</p>
                <p className={styles.musicapp}>By MusicApp <span>
              <FontAwesomeIcon icon={faMusic} />
            </span></p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const categoryData = [
    { name: "Popular radio", playlists: dataPopular },
    { name: "Recommended radio", playlists: dataRecommended },
    { name: "Latin favorite", playlists: dataLatin },
  ];

  return <div>{categoryData.map(renderCategory)}</div>;
};

export default Home;
