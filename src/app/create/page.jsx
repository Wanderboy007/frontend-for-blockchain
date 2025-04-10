"use client";

import { useState } from "react";
import manager from "../../utils/contract";
import web3 from "../../utils/web3";

export default function CreateAuction() {
  const [item, setItem] = useState("");
  const [duration, setDuration] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Creating auction...");
    const accounts = await web3.eth.getAccounts();
    try {
      await manager.methods
        .createAuction(item, duration)
        .send({ from: accounts[0] });
      setMessage("Auction created successfully!");
    } catch (err) {
      setMessage("Error creating auction.");
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Auction</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Item Name:</label>
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="border p-2 rounded mb-4 block"
          />
        </div>
        <div>
          <label>Duration (in seconds):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border p-2 rounded mb-4 block"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Auction
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
