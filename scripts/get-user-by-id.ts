const { ethers } = require("hardhat");
import * as TableJson from "../artifacts/contracts/DataPartition.sol/Table.json";

/**
 * command: npx hardhat run scripts/get-user-by-id.ts --network tubenet
 */

async function main() {
    const [account_1] = await ethers.getSigners();

    const tableAddress = "0xdEaf47941Ea4a48650159110B4559C784C4E9290"
    // Instantiate Table contract
    const tableContract = new ethers.Contract(tableAddress, TableJson.abi, account_1);
    const record = await tableContract.getRowById(1);
    console.log("Record retrieved");
    console.log(record);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });