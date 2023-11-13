import React, { useState, useEffect } from "react";
import {
  popularRadio,
  recommendedRadio,
  latinFavorite,
} from "../../services/helpers";
import { getPlayLists } from "../../services/api";
import ListCard from "../../components/ListCard/ListCard";

const Home = ({ token }) => {
  const [dataPopular, setDataPopular] = useState([]);
  const [dataRecommended, setDataRecommended] = useState([]);
  const [dataLatin, setDataLatin] = useState([]);

  const categoryData = [
    { name: "Popular radio", playlists: dataPopular },
    { name: "Recommended radio", playlists: dataRecommended },
    { name: "Latin favorite", playlists: dataLatin },
  ];

  const categoriesData = [
    {
      playlist: popularRadio,
      setData: setDataPopular,
    },
    {
      playlist: recommendedRadio,
      setData: setDataRecommended,
    },
    {
      playlist: latinFavorite,
      setData: setDataLatin,
    },
  ];

  useEffect(() => {
    if (token) {
      fetchDataForCategories(categoriesData);
    }
  }, [token]);

  const fetchDataForCategories = async (categories) => {
    for (const category of categories) {
      const { playlist, setData } = category;
      await fetchDataForCategory(playlist, setData);
    }
  };
  
  const fetchDataForCategory = async (category, setData) => {
    for (const id of category) {
      try {
        const response = await getPlayLists(id, token);
  
        if (response) {
          setData((prevData) => [...prevData, response.data]);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return <ListCard categoryData={categoryData} />;
};

export default Home;
