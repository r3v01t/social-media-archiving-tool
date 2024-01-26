import { deployContract } from "./utils";

export default async function () {
  const contractArtifactName = "Wallet";
  const WEB_ARCHIVE_CONTRACT_ADDRESS = process.env.WEB_ARCHIVE_CONTRACT_ADDRESS;
  await deployContract(contractArtifactName, [WEB_ARCHIVE_CONTRACT_ADDRESS]);
}
