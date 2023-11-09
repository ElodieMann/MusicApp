import axios from "axios";
import React, { useState, useEffect } from "react";
import ListCard from "../../components/ListCard/ListCard";

const Home = ({ token }) => {
  const [dataPopular, setDataPopular] = useState([]);
  const [dataRecommended, setDataRecommended] = useState([]);
  const [dataLatin, setDataLatin] = useState([]);
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

  useEffect(() => {
    if (token) {
      fetchDataForCategory(popularRadio, setDataPopular, token);
      fetchDataForCategory(recommendedRadio, setDataRecommended, token);
      fetchDataForCategory(latinFavorite, setDataLatin, token);
    }
  }, [token]);

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

  const categoryData = [
    { name: "Popular radio", playlists: dataPopular },
    { name: "Recommended radio", playlists: dataRecommended },
    { name: "Latin favorite", playlists: dataLatin },
  ];


  return <ListCard categoryData={categoryData} />;
};

export default Home;
