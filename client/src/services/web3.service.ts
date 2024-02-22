import { DEPLOYED_CONTRACT_ADDRESS, CONTRACT_ABI } from "../config/web3.config";
import { ethers } from "ethers";
import { utils, Provider, Contract, Web3Provider } from "zksync-web3";

export const getSigner = async () => {
  const provider = new Web3Provider(window.ethereum);
  return await provider.getSigner();
};

// TODO: proper type for abi
export const getContract = async (contractAddress: string, abi: any) => {
  const signer = await getSigner();
  return new Contract(contractAddress, abi, signer);
};

export const createArchiveByWallet = async (
  pHash: string,
  fileName: string
) => {
  const WALLET_ADDRESS = import.meta.env.VITE_WALLET_ADDRESS as string;
  const provider = new Provider(import.meta.env.VITE_ZKSYNC_RPC_URL);
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
      const formattedPHash = ethers.utils.formatBytes32String(pHash);
      const [timestamp, ipAddress, encodedWebPageUrl] = fileName.split("#");
      // TODO: toasts if this results in undefined (filename is not correct)
      const formattedIPAddress = ethers.utils.formatBytes32String(ipAddress);

      const tx = await contract.setArchive(
        timestamp,
        formattedIPAddress,
        formattedPHash,
        encodedWebPageUrl,
        {
          customData: {
            gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
            paymasterParams: paymasterParams,
          },
        }
      );

      await tx.wait();
    }
  } catch (error: unknown) {
    console.error(error);
  }
};
