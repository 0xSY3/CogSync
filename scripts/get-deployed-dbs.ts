
const { ethers } = require("hardhat");
import * as NetworkBridgeJson from "../artifacts/contracts/NetworkBridge.sol/NetworkBridge.json";
import * as TableJson from "../artifacts/contracts/DataPartition.sol/Table.json";
import { DB, NetworkBridge__factory, DBManager, DBManager__factory, DB__factory, Table, Table__factory } from "../typechain-types";
import { tableAttributes } from "./utils/tableAttributes";

/**
 * command: npx hardhat run scripts/get-deployed-dbs.ts --network calibnet
 */

async function main() {
    const [account_1] = await ethers.getSigners();

    const NetworkBridgeAddress = "0x95D8B3ec1F724785728e7c6D9b7645183f41094c";

    const NetworkBridgeContract = new ethers.Contract(NetworkBridgeAddress, NetworkBridgeJson.abi, account_1);

await NetworkBridgeContract.callDbManagerOnSubnet();


    const logs = await ethers.provider.getLogs({
        address: NetworkBridgeAddress,
        topics: await NetworkBridgeContract.filters.NetworkBridgeRead().getTopicFilter(),
        fromBlock: 1443000,
        toBlock: 'latest',
    })

    const message = logs.map((log: any) => NetworkBridgeContract.interface.parseLog(log)?.args[0])[0][0]

    console.log("Message sent towards the tube subnet:",message)

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
