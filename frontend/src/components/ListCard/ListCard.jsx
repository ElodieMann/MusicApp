import React from "react";
import Card from "../Card/Card";

const ListCard = ({ categoryData }) => {
  return (
    <div>
        
      {categoryData?.map((category, index) => (
        <Card key={index} category={category}  />
      ))}
    </div>
  );
};

export default ListCard;
