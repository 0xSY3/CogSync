import { ethers } from "hardhat";
import { CGS, CGS__factory } from "../typechain-types";

/**
 * command: npx hardhat run scripts/deploy-CGS.ts --network local
 */
async function main() {
  // Get the account to deploy the contract
  const [account_1] = await ethers.getSigners();

  console.log("Deploying CogSync token with the account:", account_1.address);

  const CogSyncFactory : CGS__factory= await ethers.getContractFactory("CGS", account_1);
  const initialSupply = ethers.parseEther("1000000"); 
  const cogsync : CGS = await CogSyncFactory.deploy(initialSupply);

  console.log("CogSync token deployed at address:", await cogsync.getAddress());
}

// Execute the deployment script
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
