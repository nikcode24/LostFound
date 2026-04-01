import React from "react";
import { FaCalendar } from "react-icons/fa";

const ItemCard = ({ name, location, date, status, image }) => {
  return (
    <div className="card">
      <img src={image} alt={name} />

      <div className="card-body">
        <p>Item Name: {name}</p>
        <p>Location: {location}</p>
        <p><FaCalendar /> {date}</p>

        <p className={status === "lost" ? "lost" : "found"}>
          {status === "lost" ? "Lost" : "Found"} {name}
        </p>
      </div>
    </div>
  );
};

export default ItemCard;