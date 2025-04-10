"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAuctionContract } from "../../../utils/contract";
import web3 from "../../../utils/web3";

export default function AuctionDetail() {
  const { address } = useParams();
  const [auctionData, setAuctionData] = useState({
    item: "",
    highestBid: "0",
    highestBidder: "",
    endTime: 0,
  });
  const [timeLeft, setTimeLeft] = useState("");
  const [bidValue, setBidValue] = useState("");

  useEffect(() => {
    async function loadData() {
      const auction = getAuctionContract(address);
      const item = await auction.methods.item().call();
      const highestBid = await auction.methods.highestBid().call();
      const highestBidder = await auction.methods.highestBidder().call();
      const endTime = await auction.methods.auctionEndTime().call();

      setAuctionData({ item, highestBid, highestBidder, endTime });
    }
    loadData();
  }, [address]);

  // Countdown timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const secondsRemaining = auctionData.endTime - now;
      if (secondsRemaining <= 0) {
        setTimeLeft("Auction ended");
        clearInterval(interval);
      } else {
        const minutes = Math.floor(secondsRemaining / 60);
        const seconds = secondsRemaining % 60;
        setTimeLeft(`${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [auctionData.endTime]);

  // Place a bid function (simplified)
  const placeBid = async () => {
    const accounts = await web3.eth.getAccounts();
    const auction = getAuctionContract(address);
    await auction.methods.bid().send({
      from: accounts[0],
      value: web3.utils.toWei(bidValue, "ether"),
    });
    // Reload auction data after bid
    const newHighestBid = await auction.methods.highestBid().call();
    setAuctionData((prev) => ({ ...prev, highestBid: newHighestBid }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Auction Details</h1>
      <p>
        <strong>Item:</strong> {auctionData.item}
      </p>
      <p>
        <strong>Highest Bid:</strong>{" "}
        {web3.utils.fromWei(auctionData.highestBid, "ether")} ETH
      </p>
      <p>
        <strong>Highest Bidder:</strong> {auctionData.highestBidder}
      </p>
      <p>
        <strong>Time Left:</strong> {timeLeft}
      </p>
      <div className="mt-4">
        <input
          type="number"
          placeholder="Bid in ETH"
          value={bidValue}
          onChange={(e) => setBidValue(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={placeBid}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Place Bid
        </button>
      </div>
    </div>
  );
}
