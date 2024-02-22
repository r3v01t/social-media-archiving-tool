import * as hre from "hardhat";
import { ethers } from "ethers";
import { getWallet } from "../deploy/utils";

const CONTRACT_ADDRESS = process.env.WALLET_CONTRACT_ADDRESS as string;
if (!CONTRACT_ADDRESS)
  throw "⛔️ Provide address of the contract to interact with!";

export default async function debug() {
  console.log(`Running script to interact with contract ${CONTRACT_ADDRESS}`);

  // Load compiled contract info
  const contractArtifact = await hre.artifacts.readArtifact("Wallet");

  // Initialize contract instance for interaction
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractArtifact.abi,
    getWallet(process.env.WALLET_PRIVATE_KEY) // Interact with the contract on behalf of this wallet
  );

  const address = await contract.smatContract();
  console.log(address);
}

debug();
