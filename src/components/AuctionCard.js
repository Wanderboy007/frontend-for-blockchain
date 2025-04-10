"use client";

import React, { useEffect, useState } from "react";
import web3 from "../utils/web3";
import { getAuctionContract } from "../utils/contract";

const AuctionCard = ({ address }) => {
    // Local state for storing auction data.
    // Note: endTime is stored as a number (seconds) after conversion.
    const [auctionData, setAuctionData] = useState({
        item: "",
        highestBid: "0",
        highestBidder: "",
        auctionEndTime: 0,
    });
    const [timeLeft, setTimeLeft] = useState("Loading...");

    // Fetch auction details from the blockchain.
    useEffect(() => {
        async function loadData() {
            try {
                const auction = getAuctionContract(address);
                const item = await auction.methods.item().call();
                const highestBid = await auction.methods.highestBid().call();
                const highestBidder = await auction.methods.highestBidder().call();
                // Convert auctionEndTime explicitly to a number
                const auctionEndTime = Number(await auction.methods.auctionEndTime().call());
                setAuctionData({ item, highestBid, highestBidder, auctionEndTime });
            } catch (err) {
                console.error("Error loading auction data", err);
            }
        }
        loadData();
    }, [address]);



    // Set up a countdown timer using the auctionEndTime.
    useEffect(() => {
        // Only set the timer if auctionEndTime is a valid (non-zero) number.
        if (!auctionData.auctionEndTime) return;

        const interval = setInterval(() => {
            const now = Math.floor(Date.now() / 1000);
            const secondsRemaining = auctionData.auctionEndTime - now;

            if (secondsRemaining <= 0) {
                setTimeLeft("Auction ended");
                clearInterval(interval);
            } else {
                const minutes = Math.floor(secondsRemaining / 60);
                const seconds = secondsRemaining % 60;
                // Format with leading zero if desired:
                setTimeLeft(`${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [auctionData.auctionEndTime]);

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4 p-4">
            <h2 className="text-xl text- font-bold mb-2">{auctionData.item}</h2>
            <p className="text-gray-700 mb-1">
                <span className="font-semibold">Highest Bid:</span> {web3.utils.fromWei(auctionData.highestBid, "ether")} ETH
            </p>
            <p className="text-gray-700 mb-1">
                <span className="font-semibold">Highest Bidder:</span> {auctionData.highestBidder || "No bid yet"}
            </p>
            <p className="text-gray-700 mb-1">
                <span className="font-semibold">Time Left:</span> {timeLeft}
            </p>
            <p className="text-gray-500 text-xs mt-2">Auction Address: {address}</p>
        </div>
    );
};

export default AuctionCard;
