import { DEPLOYED_CONTRACT_ADDRESS, CONTRACT_ABI } from "@/config/web3";
import { ethers, Contract } from "ethers";

export const getSigner = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  return await provider.getSigner();
};

export const getContract = async (
  contractAddress: string,
  abi: ethers.Interface | ethers.InterfaceAbi
) => {
  const signer = await getSigner();
  return new Contract(contractAddress, abi, signer);
};

export const createArchive = async (imgString: string, url: string) => {
  const contract = await getContract(DEPLOYED_CONTRACT_ADDRESS, CONTRACT_ABI);
  const bytes32Hash = ethers.id(url);
  return contract.setArchive(bytes32Hash, url);
};

export const getArchives = async () => {
  const contract = await getContract(DEPLOYED_CONTRACT_ADDRESS, CONTRACT_ABI);
  return await contract.getArchives();
};
