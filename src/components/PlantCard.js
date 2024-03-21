// File: PlantCard.js
import React, { useState } from "react";

function PlantCard({ plant, onPriceUpdate }) {
 const [isSoldOut, setIsSoldOut] = useState(false);
 const [isEditing, setIsEditing] = useState(false);
 const [newPrice, setNewPrice] = useState(plant.price);

 const toggleSoldOut = () => {
    setIsSoldOut(!isSoldOut);
 };

 const toggleEditing = () => {
    setIsEditing(!isEditing);
 };

 const handlePriceChange = (event) => {
    setNewPrice(event.target.value);
 };

const submitNewPrice = () => {
 onPriceUpdate(plant.id, newPrice)
    .then(() => {
      // Assuming onPriceUpdate updates the plant's price in the database
      // and returns a promise that resolves when the update is complete.
      // After the promise resolves, toggleEditing to exit edit mode.
      toggleEditing();
    })
    .catch(error => {
      console.error('Failed to update plant:', error);
      // Optionally, handle the error in the UI, e.g., by showing a message.
    });
};

return (
  <li className="card" data-testid="plant-item">
    <div className="card-content">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      {isEditing ? (
        <div>
          <input type="number" step="0.01" value={newPrice} onChange={handlePriceChange} />
          <button onClick={submitNewPrice}>Submit</button>
        </div>
      ) : (
        <>
          <p>Price: {plant.price}</p>
          <p style={{ float: 'right', color: 'blue', cursor: 'pointer' }} onClick={toggleEditing}>Edit</p>
        </>
      )}
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