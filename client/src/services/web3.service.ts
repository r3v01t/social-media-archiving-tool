import { DEPLOYED_CONTRACT_ADDRESS, CONTRACT_ABI } from "../config/web3.config";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { utils, Provider, Contract, Web3Provider } from "zksync-web3";
import { JSONRPCError } from "../types/errors.types";

export const getSigner = async () => {
  const provider = new Web3Provider(window.ethereum);
  return await provider.getSigner();
};

export const getContract = async (
  contractAddress: string,
  abi: typeof CONTRACT_ABI
) => {
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

      if (!timestamp || !ipAddress || !encodedWebPageUrl) {
        toast.error(
          "Invalid filename. Make sure you use our plugin to save the screenshot and dont change the filename. 🚨"
        );
      }
      const formattedIPAddress = ethers.utils.formatBytes32String(ipAddress);

      const tx = await contract.setArchive(
        timestamp,
        formattedIPAddress,
        formattedPHash,
        encodedWebPageUrl.split(".")[0],
        {
          customData: {
            gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
            paymasterParams: paymasterParams,
          },
        }
      );

      await tx.wait();
      toast.success("Your screenshot was archived successfully! 🔥");
    }
  } catch (error: unknown) {
    if (error && typeof error === "object") {
      const _error = error as JSONRPCError;

      if (
        _error.data?.message.includes(
          "failed paymaster validation. error message: Paymaster can not be used for this transaction."
        )
      ) {
        toast.error("Wallet can not be used for this transaction! 🚨");
      } else if (
        _error.data?.message.includes("Archive already exists") ||
        _error.reason.includes("Archive already exists")
      ) {
        toast.warning("This screenshot is already archived! 🙂");
      } else {
        toast.error("Archive failed, please try again! 🚨");
      }
    }
  }
};
