import { FastifyInstance } from "fastify";
import { utils, Provider, Contract, types, Wallet } from "zksync-ethers";
import {
  CONTRACT_ABI,
  DEPLOYED_CONTRACT_ADDRESS,
  PRIVATE_KEY,
  WALLET_ADDRESS,
} from "../config";
import { ethers } from "ethers";

interface PostBody {
  pHash: string;
  ip: string;
  timestamp: number;
  encodedWebPageUrl: string;
  walletAddress: string;
}

const postBodyJsonSchema = {
  type: "object",
  required: ["pHash", "ip", "timestamp", "encodedWebPageUrl", "walletAddress"],
  properties: {
    pHash: { type: "string" },
    ip: { type: "string" },
    timestamp: { type: "string" },
    encodedWebPageUrl: { type: "string" },
    walletAddress: { type: "string" },
  },
};

type JSONRPCError = {
  data?: Record<string, string>;
  message: string;
  reason: string;
};

const getContract = async (
  provider: Provider,
  contractAddress: string,
  abi: typeof CONTRACT_ABI
) => {
  const wallet = new Wallet(PRIVATE_KEY as string, provider);
  return new Contract(contractAddress, abi, wallet);
};

async function routes(fastify: FastifyInstance, options: unknown) {
  fastify.get("/", async (req, res) => {
    return { message: "Backend is up!" };
  });

  fastify.post(
    "/archive",
    { schema: { body: postBodyJsonSchema } },
    async (req, res) => {
      const { pHash, ip, timestamp, encodedWebPageUrl, walletAddress } =
        req.body as PostBody;

      const provider = Provider.getDefaultProvider(types.Network.Sepolia);

      const contract = await getContract(
        provider,
        DEPLOYED_CONTRACT_ADDRESS as string,
        CONTRACT_ABI
      );
      const paymasterBalance = await provider.getBalance(
        WALLET_ADDRESS as string
      );

      const gasPrice = await provider.getGasPrice();
      const paymasterParams = utils.getPaymasterParams(
        WALLET_ADDRESS as string,
        {
          type: "General",
          innerInput: new Uint8Array(),
        }
      );

      try {
        if (contract) {
          if (!timestamp || !ip || !encodedWebPageUrl) {
            return {
              message: "Missing required data",
            };
          }
          const formattedIPAddress = ethers.encodeBytes32String(ip);
          const formattedPHash = ethers.encodeBytes32String(pHash);

          const tx = await contract.setArchive(
            timestamp,
            formattedIPAddress,
            formattedPHash,
            encodedWebPageUrl.split(".")[0],

            {
              maxPriorityFeePerGas: BigInt(0),
              maxFeePerGas: gasPrice,
              gasLimit: 6000000,
              customData: {
                gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
                paymasterParams: paymasterParams,
              },
            }
          );

          await tx.wait();
          return {
            message: "Your screenshot was archived successfully!",
          };
        }
      } catch (error: unknown) {
        if (error && typeof error === "object") {
          const _error = error as JSONRPCError;

          if (
            _error.data?.message.includes(
              "failed paymaster validation. error message: Paymaster can not be used for this transaction."
            )
          ) {
            return {
              message: "Wallet can not be used for this transaction!",
            };
          } else if (
            _error.data?.message.includes("Archive already exists") ||
            _error.reason.includes("Archive already exists")
          ) {
            return {
              message: "This screenshot is already archived! ",
            };
          } else {
            return {
              message: "Archive failed, please try again!",
            };
          }
        }

        return { balance: paymasterBalance };
      }
    }
  );
}

export default routes;
