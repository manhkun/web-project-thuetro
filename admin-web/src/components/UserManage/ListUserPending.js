import React from "react";
import { UserPending } from "./UserItem";

export const ListUserPending = ({ data }) => {
  return (
    <div>
      {data.map((item) => {
        return (
          <UserPending
            name={item.owner_full_name}
            username={item.owner_name}
            id_card={item.profile.id_card}
            location={`${item.address.street} - ${item.address.commune} - ${item.address.district} - ${item.address.province}`}
            phone={item.profile.phone_number}
            email={item.profile.email}
          />
        );
      })}
    </div>
  );
};
