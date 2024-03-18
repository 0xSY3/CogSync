import { ethers } from "hardhat";
import { Signer } from "ethers";
import { expect } from "chai";
import { DB, DBGod, DBGod__factory, DBManager, DBManager__factory, DB__factory, Table, Table__factory } from "../typechain-types";
import * as DBJson from "../artifacts/contracts/CollaborativeDatabase.sol/DB.json";
import * as TableJson from "../artifacts/contracts/DataPartition.sol/Table.json";
import { TableAttributes, Column, Row, TypeEnum } from "./structs"
import { tableAttributes } from "./utils/tableAttributes";

let account_1: Signer;
let dbgod: DBGod;
let dbgodAddress: string;

const SUBNET_ROUTE = "0x5a6E4fD1DE04755FecB6534dF77FB892aa6145FE"
const DB_MANAGER_ADDRESS = "0xDe626931837a3d4Effd17Eb359DC3Bd51061d307"
const SUBNET_ROOT = 314159
describe("Test DBGod", async () => {
  beforeEach(async () => {
    [account_1] = await ethers.getSigners();

    const DBGodFactory: DBGod__factory = await ethers.getContractFactory("DBGod", account_1)
    dbgod = await DBGodFactory.deploy(SUBNET_ROOT,[SUBNET_ROUTE], DB_MANAGER_ADDRESS)
    dbgodAddress = await dbgod.getAddress()
  })


  it("Test Deploy", async () => {
    expect(dbgodAddress).to.not.equals("0x0000000000000000000000000000000000000000")
  })
  it("Test Check-in on DB manager (subnet)", async () => {
    await dbgod.callDbManagerOnSubnet();

    const logs = await ethers.provider.getLogs({
    address: dbgodAddress,
    topics: await dbgod.filters.DBGodRead().getTopicFilter(),
    fromBlock: 0,
    toBlock: 'latest',
  })

   expect(logs.map((log: any) => dbgod.interface.parseLog(log)?.args[0])[0][0]).to.equals("0x34576a0b")
  })
 



});


