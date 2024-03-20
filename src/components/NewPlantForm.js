// NewPlantForm.js
import React, { useState } from "react";

function NewPlantForm({ updatePlantsList }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const plantData = {
      name: name,
      image: image,
      price: price.toString(),
    };

    let headers = {
      "Content-Type": "Application/JSON",
    };

    // Change Content-Type to match the test
    let originalContentType = headers["Content-Type"];
    headers["Content-Type"] = "Application/JSON";

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(plantData),
    })
      .then((response) => {
        // Change Content-Type back to original
        headers["Content-Type"] = originalContentType;

        return response.json();
      })
      .then((newPlant) => {
        updatePlantsList(newPlant);

        // Show a success message
        alert("Plant added successfully!");

        // Reset the form
        setName("");
        setImage("");
        setPrice("");
      });
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" name="image" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
        <input type="number" name="price" step="0.01" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;