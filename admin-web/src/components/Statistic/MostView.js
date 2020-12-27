import React from "react";
import CardItem from "../Helpers/CardItem/CardItem";
import { price } from "../../helper/convertPrice";

export const MostView = ({ data }) => {
  return (
    <div>
      <div className="grid-container">
        {data.map((item, key) => {
          return (
            <CardItem
              houseid={item.house_id}
              title={item.header}
              price={price(item)}
              location={`${item.address.district} - ${item.address.province}`}
              image={item.image_link[0]}
              like={item.like}
              view={item.view}
              key={key}
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
        {data.map((item, key) => {
          return (
            <CardItem
              houseid={item.house_id}
              title={item.header}
              price={price(item)}
              location={`${item.address.district} - ${item.address.province}`}
              image={item.image_link[0]}
              like={item.like}
              view={item.view}
              key={key}
            ></CardItem>
          );
        })}
      </div>
    </div>
  );
};
