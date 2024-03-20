// File: PlantCard.js
import React, { useState } from "react";

function PlantCard({ plant }) {
 const [isSoldOut, setIsSoldOut] = useState(false);

 const toggleSoldOut = () => {
    setIsSoldOut(!isSoldOut);
 };

 return (
    <li className="card" data-testid="plant-item">
      <div className="card-content">
        <img src={plant.image} alt={plant.name} />
        <h4>{plant.name}</h4>
        <p>Price: {plant.price}</p>
        <button className="primary" onClick={toggleSoldOut}>
          {isSoldOut ? "Out of Stock" : "In Stock"}
        </button>
        {isSoldOut && (
          <div className="sold-out-overlay">
            <span>Sold Out!</span>
          </div>
        )}
      </div>
    </li>
 );
}

export default PlantCard;