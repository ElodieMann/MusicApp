import React from "react";
import Card from "../Card/Card";

const ListCard = ({ categoryData }) => {
  return (
    <div style={{height:'100vh', overflowY:'auto'}}>
      {/*  jamais style toujours des classes */}
        
      {categoryData?.map((data, index) => (
        <Card key={index} data={data}  />
      ))}
    </div>
  );
};

export default ListCard;
