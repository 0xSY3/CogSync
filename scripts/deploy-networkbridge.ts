
const { ethers } = require("hardhat");
import * as DBJson from "../artifacts/contracts/CollaborativeDatabase.sol/DB.json";
import * as TableJson from "../artifacts/contracts/DataPartition.sol/Table.json";
import { DB, NetworkBridge__factory, DBManager, DBManager__factory, DB__factory, Table, Table__factory } from "../typechain-types";
import { tableAttributes } from "./utils/tableAttributes";



/**
 * command: npx hardhat run scripts/deploy-networkbridge.ts --network calibnet
 */
const SUBNET_ROUTE = "0x5a6E4fD1DE04755FecB6534dF77FB892aa6145FE"
const DB_MANAGER_ADDRESS = "0xDe626931837a3d4Effd17Eb359DC3Bd51061d307"
const SUBNET_ROOT = 314159

async function main() {
    const [account_1] = await ethers.getSigners();

    const NetworkBridgeFactory: NetworkBridge__factory = await ethers.getContractFactory("NetworkBridge", account_1)
    const NetworkBridge = await NetworkBridgeFactory.deploy(SUBNET_ROOT, [SUBNET_ROUTE], DB_MANAGER_ADDRESS)
    const NetworkBridgeAddress = await NetworkBridge.getAddress()
    console.log("NetworkBridge address deployed at:",NetworkBridgeAddress)

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
