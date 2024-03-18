
const { ethers } = require("hardhat");
import * as DBJson from "../artifacts/contracts/CollaborativeDatabase.sol/DB.json";
import * as TableJson from "../artifacts/contracts/DataPartition.sol/Table.json";
import { DB, DBManager, DBManager__factory, DB__factory, Table, Table__factory } from "../typechain-types";
import { tableAttributes } from "./utils/tableAttributes";



/**
 * command: npx hardhat run scripts/deploy-dbmanager.ts --network tubenet
 */
async function main() {
    const [account_1] = await ethers.getSigners();

    // DB Implementation deployment
    const DBFactory: DB__factory = await ethers.getContractFactory("DB", account_1);
    const database: DB = await DBFactory.deploy();
    const dbImplementationAddress = await database.getAddress();

    // Table Implementation deployment
    const TableFactory: Table__factory = await ethers.getContractFactory("Table", account_1);
    const tableImplementation: Table = await TableFactory.deploy();
    const tableImplementationAddress = await tableImplementation.getAddress();

    // DBManager Deployment
    const DBManagerFactory: DBManager__factory = await ethers.getContractFactory("DBManager", account_1);
    const dbManager: DBManager = await DBManagerFactory.deploy(dbImplementationAddress, tableImplementationAddress);
    const dbManagerAddress = await dbManager.getAddress();
    console.log("DB MANAGER ADDRESS:", dbManagerAddress)

    // Create new DB
    const dbOwnerAddress = await account_1.getAddress();
    await dbManager.createNewDb(dbOwnerAddress, "First-Tube-DB-Ever");

    const dbId = await dbManager.databaseOwners(dbOwnerAddress);
    const databaseAddress = await dbManager.deployedDatabases(dbId);
    console.log("DB ADDRESS:", databaseAddress)
    console.log("DB ID:", dbId)

    // Instantiate DB contract
    const dbContract = new ethers.Contract(databaseAddress, DBJson.abi, account_1);

    // Create new table
    await dbContract.createNewTable("TestTable", tableAttributes);
    const tableId = await dbContract.tableCounter();
    const tableAddress = await dbContract.tables(tableId);
    console.log("TABLE ID:", tableId)
    console.log("TABLE ADDRESS:", tableAddress)

    // Instantiate Table contract
    const tableContract = new ethers.Contract(tableAddress, TableJson.abi, account_1);
    await tableContract.create(["Fabrizio", "Gianniscorfani", "29"])
    await tableContract.create(["Gianluca", "VentiRospi", "14"])
    await tableContract.create(["Riccardo", "Mosconi", "88"])
    await tableContract.create(["Martina", "Le Paiet", "18"])
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
