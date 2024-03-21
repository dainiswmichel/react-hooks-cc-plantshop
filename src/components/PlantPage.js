// File: PlantPage.js
import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
 const [plants, setPlants] = useState([]);
 const [searchTerm, setSearchTerm] = useState('');

 useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then(response => response.json())
      .then(data => setPlants(data))
      .catch(error => console.error('Error:', error));
 }, []);

 function updatePlantsList(newPlant) {
    setPlants([...plants, newPlant]);
 }

 const handleSearch = (term) => {
    setSearchTerm(term);
 };

const handlePriceUpdate = (plantId, newPrice) => {
    return fetch(`http://localhost:6001/plants/${plantId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price: newPrice }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(() => {
      const updatedPlants = plants.map(plant =>
        plant.id === plantId ? { ...plant, price: newPrice } : plant
      );
      setPlants(updatedPlants);
    });
};

 const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
 );

 return (
    <main>
      <NewPlantForm updatePlantsList={updatePlantsList} />
      <Search onSearch={handleSearch} />
      <PlantList plants={filteredPlants} onPriceUpdate={handlePriceUpdate} />
    </main>
 );
}

export default PlantPage;