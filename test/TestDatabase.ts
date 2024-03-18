import { ethers } from "hardhat";
import { Signer } from "ethers";
import { expect } from "chai";
import { DB, DBManager, DBManager__factory, DB__factory, Table, Table__factory } from "../typechain-types";
import * as DBJson from "../artifacts/contracts/CollaborativeDatabase.sol/DB.json";
import * as TableJson from "../artifacts/contracts/DataPartition.sol/Table.json";
import { TableAttributes, Column, Row, TypeEnum } from "./structs"
import { tableAttributes } from "./utils/tableAttributes";

let account_1: Signer;
let tableImplementation: Table;
let tableImplementationAddress: string;
let database: DB;
let dbImplementationAddress: string;
let dbManager: DBManager;
let dbManagerAddress: string;

let dbOwnerAddress: string
let databaseAddress: string
let dbContract: DB
let tableAddress: string
let tableContract: Table

describe("Test Db Creation", async () => {
  beforeEach(async () => {
    [account_1] = await ethers.getSigners();

    // DB Implementation
    const DBFactory: DB__factory = await ethers.getContractFactory("DB", account_1)
    database = await DBFactory.deploy()
    dbImplementationAddress = await database.getAddress()

    // Table Implementation
    const TableFactory: Table__factory = await ethers.getContractFactory("Table", account_1)
    tableImplementation = await TableFactory.deploy()
    tableImplementationAddress = await tableImplementation.getAddress()

    // DBManager Deploy
    const DBManagerFactory: DBManager__factory = await ethers.getContractFactory("DBManager", account_1)
    dbManager = await DBManagerFactory.deploy(dbImplementationAddress, tableImplementationAddress)
    dbManagerAddress = await dbManager.getAddress()

    dbOwnerAddress = await account_1.getAddress()
    await dbManager.createNewDb(dbOwnerAddress, "TestDB")

    const dbId = Number(await dbManager.databaseOwners(dbOwnerAddress))
    databaseAddress = await dbManager.deployedDatabases(dbId)

    dbContract = new ethers.Contract(databaseAddress, DBJson.abi, account_1) as unknown as DB

    await dbContract.createNewTable("TestTable", tableAttributes)
    const tableId = Number(await dbContract.tableCounter())
    tableAddress = await dbContract.tables(tableId)


    tableContract = new ethers.Contract(tableAddress, TableJson.abi, account_1) as unknown as Table
  })


  it("Test Deploy", async () => {
    expect(tableImplementationAddress).to.be.not.null
    expect(dbImplementationAddress).to.be.not.null
    expect(await dbManager.tableImplementation()).to.equal(tableImplementationAddress)
    expect(await dbManager.dbImplementation()).to.equal(dbImplementationAddress)
  })
  it("Test Creation new DB and new table", async () => {
    expect(databaseAddress).to.be.not.null
    expect(tableAddress).to.be.not.null
    expect(databaseAddress).to.equal(await tableContract.db())
  })
  it("Test Creation of a new row", async () => {
   await tableContract.create(["Fabrizio", "Gianniscorfani","29"])
   await tableContract.create(["Gianluca", "VentiRospi","14"])
   await tableContract.create(["Riccardo", "Mosconi","88"])
   await tableContract.create(["Martina", "Le Paiet","18"])
   const allRows = await tableContract.getAllRows()
   expect(allRows.length).equals(4)
   



  })



});


