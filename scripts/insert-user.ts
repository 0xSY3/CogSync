const { ethers } = require("hardhat");
import * as TableJson from "../artifacts/contracts/DataPartition.sol/Table.json";

/**
 * command: npx hardhat run scripts/insert-user.ts --network tubenet
 */

async function main() {
    const [account_1] = await ethers.getSigners();

    const tableAddress = "0xdEaf47941Ea4a48650159110B4559C784C4E9290"
    // Instantiate Table contract
    const tableContract = new ethers.Contract(tableAddress, TableJson.abi, account_1);
    await tableContract.create(["Andres", "Rahmani", "29"])
    await tableContract.create(["Valentino", "Rossi", "14"])
    await tableContract.create(["John", "Doe", "88"])
    await tableContract.create(["Luz", "Calderon", "18"])
    const allRows = await tableContract.getAllRows()

    console.log("Contracts deployed successfully!");
    console.log("Rows created are:", allRows);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });