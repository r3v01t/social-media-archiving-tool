import { deployContract } from "./utils";

export default async function () {
  const contractArtifactName = "WebArchive";
  await deployContract(contractArtifactName, []);
}
