import React from "react";
import houseApi from "../../../api/houseApi";
import convertTime from "../../../helper/convertTime";
import "./Comment.css";

export const Comment = ({ data }) => {
  const handleAccept = async (e) => {
    let res = await houseApi.acceptComment(data.comment_id);
    console.log(res);
  };

  const handleDelete = async (e) => {
    let res = await houseApi.deleteComment(data.comment_id);
    console.log(res);
  };

  return (
    <div>
      <div className={`comment ${!data.activate && "not-active"} `}>
        <div className="profile-comment">
          <img src="/icons/profile 1.png" alt="" />
          <div className="name-star">
            <p>{data.renter_id}</p>
            <div className="star">
              {[...Array(data.star)].map((e) => (
                <i className="fa fa-star" aria-hidden="true"></i>
              ))}
            </div>
          </div>
        </div>
        <div className="content-comment">
          <div className="time-comment">
            <img src="/icons/clock 1.png" alt="" />
            <p>{convertTime(data.post_time)}</p>
          </div>
          <p>{data.content}</p>
        </div>
      </div>
      {!data.activate && (
        <div className="approval-comment">
          <img src="/icons/check.png" alt="" onClick={handleAccept} />
          <img src="/icons/close.png" alt="" onClick={handleDelete} />
        </div>
      )}
    </div>
  );
};
