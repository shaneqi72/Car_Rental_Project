import React from "react";
import "../App.css";
import Car from "./Car";

import "./CarsList.css";

function CarsList({ cars, refreshCars }) {
  return (
    <div className="flex-container">
      <div className="table-container">
        <table className="table">
          <tr className="table-head">
            <th>Brand</th>
            <th>Model</th>
            <th>Price</th>
            <th className="table-button">Action</th>
          </tr>
          {cars.map((car) => {
            return <Car key={car.id} car={car} refreshCars={refreshCars} />;
          })}
        </table>
      </div>
    </div>
  );
}

export default CarsList;
