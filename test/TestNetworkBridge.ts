import { ethers } from "hardhat";
import { Signer } from "ethers";
import { expect } from "chai";
import { NetworkBridge, NetworkBridge__factory } from "../typechain-types";

let account_1: Signer;
let NetworkBridge: NetworkBridge;
let NetworkBridgeAddress: string;

const SUBNET_ROUTE = "0x5a6E4fD1DE04755FecB6534dF77FB892aa6145FE";
const DB_MANAGER_ADDRESS = "0xDe626931837a3d4Effd17Eb359DC3Bd51061d307";
const SUBNET_ROOT = 314159;

describe("Test NetworkBridge", async () => {
  beforeEach(async () => {
    [account_1] = await ethers.getSigners();

    const NetworkBridgeFactory: NetworkBridge__factory = await ethers.getContractFactory("NetworkBridge", account_1);
    NetworkBridge = await NetworkBridgeFactory.deploy(SUBNET_ROOT, [SUBNET_ROUTE], DB_MANAGER_ADDRESS);
    NetworkBridgeAddress = await NetworkBridge.getAddress(); // Define NetworkBridgeAddress here
  });

  it("Test Deploy", async () => {
    expect(NetworkBridgeAddress).to.not.equal("0x0000000000000000000000000000000000000000");
  });

  it("Test Check-in on DB manager (subnet)", async () => {
    await NetworkBridge.callDbManagerOnSubnet();

    const logs = await ethers.provider.getLogs({
      address: NetworkBridgeAddress,
      topics: await NetworkBridge.filters.NetworkBridgeRead().getTopicFilter(),
      fromBlock: 0,
      toBlock: 'latest',
    });

    expect(logs.map((log: any) => NetworkBridge.interface.parseLog(log)?.args[0])[0][0]).to.equal("0x34576a0b");
  });
});

