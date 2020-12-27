import React from "react";
import CardItem from "../CardItem";
import { price } from "../../helper/convertPrice";

export const MostView = ({ data }) => {
  return (
    <div>
      <div className="grid-container">
        {data.map((item) => {
          return (
            <CardItem
              houseid={item.house_id}
              title={item.header}
              price={price(item)}
              location={`${item.address.district} - ${item.address.province}`}
              image={item.image_link[0]}
              like={item.like}
              view={item.view}
            ></CardItem>
          );
        })}
      </div>
    </div>
  );
};
export const MostLike = ({ data }) => {
  return (
    <div>
      <div className="grid-container">
        {data.map((item) => {
          return (
            <CardItem
              houseid={item.house_id}
              title={item.header}
              price={price(item)}
              location={`${item.address.district} - ${item.address.province}`}
              image={item.image_link[0]}
              like={item.like}
              view={item.view}
            ></CardItem>
          );
        })}
      </div>
    </div>
  );
};
