"use client";

import React, { useEffect, useState } from "react";
import AuctionCard from "../components/AuctionCard";
import manager from "../utils/contract";

export default function Home() {
  const [auctionAddresses, setAuctionAddresses] = useState([]);

  useEffect(() => {
    async function loadAuctions() {
      try {
        // Get all deployed auction addresses from the AuctionManager
        const addresses = await manager.methods.getAllAuctions().call();
        setAuctionAddresses(addresses);
      } catch (err) {
        console.error("Error loading auctions", err);
      }
    }
    loadAuctions();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Live Auctions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {auctionAddresses.length > 0 ? (
          auctionAddresses.map((address) => (
            <AuctionCard key={address} address={address} />
          ))
        ) : (
          <p className="text-center w-full">No auctions found.</p>
        )}
      </div>
    </div>
  );
}
