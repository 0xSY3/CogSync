const { ethers } = require("hardhat");
import * as DBManagerJson from "../artifacts/contracts/DatabaseManager.sol/DBManager.json";

/**
 * command: npx hardhat run scripts/create-db.ts --network tubenet
 */

async function main() {
    const [account_1] = await ethers.getSigners();

    const DBManagerAddress = "0xDe626931837a3d4Effd17Eb359DC3Bd51061d307"
    // Instantiate Table contract
    const DBManagerContract = new ethers.Contract(DBManagerAddress, DBManagerJson.abi, account_1);

    await DBManagerContract.createNewDb(account_1, "TestDB");
    console.log("DB created succesfully!");

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });