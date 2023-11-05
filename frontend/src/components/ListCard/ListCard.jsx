import React from "react";
import Card from "../Card/Card";

const ListCard = ({ categoryData }) => {
  return (
    <div>
        
      {categoryData?.map((data, index) => (
        <Card key={index} data={data}  />
      ))}
    </div>
  );
};

export default ListCard;
