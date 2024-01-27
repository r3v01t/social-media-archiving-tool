import { DEPLOYED_CONTRACT_ADDRESS, CONTRACT_ABI } from "@/config/web3";
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
  const WALLET_ADDRESS = process.env.NEXT_PUBLIC_WALLET_ADDRESS as string;
  const provider = new Provider(process.env.NEXT_PUBLIC_ZKSYNC_RPC_URL);
  const contract = await getContract(DEPLOYED_CONTRACT_ADDRESS, CONTRACT_ABI);
  const paymasterBalance = await provider.getBalance(WALLET_ADDRESS);

  if (paymasterBalance.eq(0)) {
    return;
  }

  const paymasterParams = utils.getPaymasterParams(WALLET_ADDRESS, {
    type: "General",
    innerInput: new Uint8Array(),
  });

  try {
    if (contract) {
      const tx = await contract.setArchive(pHash, {
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
