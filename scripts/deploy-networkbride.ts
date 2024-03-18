
const { ethers } = require("hardhat");
import * as DBJson from "../artifacts/contracts/CollaborativeDatabase.sol/DB.json";
import * as TableJson from "../artifacts/contracts/DataPartition.sol/Table.json";
import { DB, DBGod__factory, DBManager, DBManager__factory, DB__factory, Table, Table__factory } from "../typechain-types";
import { tableAttributes } from "./utils/tableAttributes";



/**
 * command: npx hardhat run scripts/deploy-dbgod.ts --network calibnet
 */
const SUBNET_ROUTE = "0x5a6E4fD1DE04755FecB6534dF77FB892aa6145FE"
const DB_MANAGER_ADDRESS = "0xDe626931837a3d4Effd17Eb359DC3Bd51061d307"
const SUBNET_ROOT = 314159

async function main() {
    const [account_1] = await ethers.getSigners();

    const DBGodFactory: DBGod__factory = await ethers.getContractFactory("DBGod", account_1)
    const dbgod = await DBGodFactory.deploy(SUBNET_ROOT, [SUBNET_ROUTE], DB_MANAGER_ADDRESS)
    const dbgodAddress = await dbgod.getAddress()
    console.log("DBGOD address deployed at:",dbgodAddress)

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
