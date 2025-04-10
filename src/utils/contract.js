import web3 from "./web3";
import ManagerABI from "../../Mybuild/contracts/AuctionManager.json"; // Adjust path as needed

// Replace with your actual deployed AuctionManager address.
const managerAddress = "0x0AF0F90f9B66585C405A5A85583780046990114F";

const manager = new web3.eth.Contract(ManagerABI.abi, managerAddress);

export default manager;

// To load a specific Auction contract instance:
export const getAuctionContract = (address) => {
    const AuctionABI = require("../../Mybuild/contracts/Auction.json");
    return new web3.eth.Contract(AuctionABI.abi, address);
};
