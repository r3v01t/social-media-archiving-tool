import { DEPLOYED_CONTRACT_ADDRESS, CONTRACT_ABI } from "../config/web3.config";
import { ethers } from "ethers";
import { utils, Provider, Contract, Web3Provider } from "zksync-web3";

export const getSigner = async () => {
  const provider = new Web3Provider(window.ethereum);
  return await provider.getSigner();
};

export const getContract = async (
  contractAddress: string,
  abi: ethers.Interface | ethers.InterfaceAbi
) => {
  const signer = await getSigner();
  return new Contract(contractAddress, abi, signer);
};

export const createArchiveByWallet = async (pHash: string) => {
  const WALLET_ADDRESS = import.meta.env.VITE_WALLET_ADDRESS as string;
  console.log("0");
  const provider = new Provider(import.meta.env.VITE_ZKSYNC_RPC_URL);
  console.log("1");
  const contract = await getContract(DEPLOYED_CONTRACT_ADDRESS, CONTRACT_ABI);
  console.log("2", provider);
  console.log(WALLET_ADDRESS);
  const paymasterBalance = await provider.getBalance(WALLET_ADDRESS);
  console.log("3");
  if (paymasterBalance.eq(0)) {
    return;
  }

  const paymasterParams = utils.getPaymasterParams(WALLET_ADDRESS, {
    type: "General",
    innerInput: new Uint8Array(),
  });

  try {
    if (contract) {
      const formattedPHash = ethers.utils.formatBytes32String("test");
      const tx = await contract.setArchive(formattedPHash, {
        customData: {
          paymasterParams: paymasterParams,
          gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
        },
      });

      await tx.wait();
    }
  } catch (error: unknown) {
    console.error(error);
  }
};
