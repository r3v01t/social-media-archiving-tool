import { Injectable } from '@nestjs/common';
import { utils, Provider, Contract, types, Wallet } from 'zksync-ethers';
import { ethers } from 'ethers';
import { WEBARCHIVE_ABI, WALLET_ABI } from './abis';
import { CreateArchiveDTO } from './create-archive-dto';

@Injectable()
export class AppService {
  private readonly PRIVATE_KEY = process.env.PRIVATE_KEY as string;
  private readonly WALLET_ADDRESS = process.env.WALLET_ADDRESS as string;
  private readonly DEPLOYED_CONTRACT_ADDRESS = process.env
    .DEPLOYED_CONTRACT_ADDRESS as string;

  getHello(): string {
    return 'Hello World!';
  }

  async getContract(
    provider: Provider,
    contractAddress: string,
    abi: typeof WEBARCHIVE_ABI | typeof WALLET_ABI,
  ) {
    const wallet = new Wallet(this.PRIVATE_KEY, provider);
    return new Contract(contractAddress, abi, wallet);
  }

  async createArchive(data: CreateArchiveDTO) {
    const { walletAddress, ip, encodedWebPageUrl, pHash, timestamp } = data;
    const provider = Provider.getDefaultProvider(types.Network.Sepolia);

    const contract = await this.getContract(
      provider,
      this.DEPLOYED_CONTRACT_ADDRESS,
      WEBARCHIVE_ABI,
    );

    const gasPrice = await provider.getGasPrice();
    const paymasterParams = utils.getPaymasterParams(this.WALLET_ADDRESS, {
      type: 'General',
      innerInput: new Uint8Array(),
    });

    try {
      if (contract) {
        const formattedIPAddress = ethers.encodeBytes32String(ip);
        const formattedPHash = ethers.encodeBytes32String(pHash);

        // check if pHash already exists
        const doesPHashExist = await contract.archivedItems(
          walletAddress,
          formattedPHash,
        );

        if (doesPHashExist) {
          return { message: 'This image is already archived!' };
        }

        // check if user in allow list
        const walletContract = await this.getContract(
          provider,
          this.WALLET_ADDRESS,
          WALLET_ABI,
        );

        const isUserInAllowList = await walletContract.allowList(walletAddress);

        if (!isUserInAllowList) {
          return {
            message: 'Sorry, you do not have the permissions to archive!',
          };
        }

        const tx = await contract.setArchive(
          walletAddress,
          timestamp,
          formattedIPAddress,
          formattedPHash,
          encodedWebPageUrl.split('.')[0],

          {
            maxPriorityFeePerGas: BigInt(0),
            maxFeePerGas: gasPrice,
            gasLimit: 6000000,
            customData: {
              gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
              paymasterParams: paymasterParams,
            },
          },
        );

        await tx.wait();
        return {
          message: 'Your screenshot was archived successfully!',
        };
      }
    } catch (error: unknown) {
      return { message: 'An error occurred!' };
    }
  }
}
