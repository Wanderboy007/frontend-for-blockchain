import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    // Client-side: meta mask is available in the browser.
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
} else {
    // Server-side or fallback:
    const provider = new Web3.providers.HttpProvider("http://localhost:7545"); // Change to your provider
    web3 = new Web3(provider);
}

export default web3;
