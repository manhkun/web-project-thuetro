import React from "react";
import { UserActive } from "./UserItem";

export const ListUserActive = ({ data }) => {
  return (
    <div>
      {data.map((item) => {
        return (
          <UserActive
            id={item.owner_name}
            name={item.owner_full_name}
            id_card={item.profile.id_card}
            location={`${item.address.street} - ${item.address.commune} - ${item.address.district} - ${item.address.province}`}
            phone={item.profile.phone_number}
            email={item.profile.email}
            post_num="3 bài"
            evaluate={item.average_star}
            create_at="06/11/2000 23:30"
          />
        );
      })}
    </div>
  );
};
