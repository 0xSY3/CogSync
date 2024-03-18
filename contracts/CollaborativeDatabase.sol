// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "./DataPartition.sol";
import {TableAttributes} from "./structs/TableStructs.sol";


// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract DB is Initializable {
    address public owner;
    string public dbName;
    address private tableImplementation;
    mapping(uint256 => address)public tables;
    uint256 public tableCounter;

    event TableCreated(uint256 index, string name);

    constructor() {
    }
    function initialize(address _owner, string memory _dbName, address _tableImplementation) external initializer {
        owner = _owner;
        dbName = _dbName;
        tableImplementation = _tableImplementation;
    }

    function createNewTable(string memory _tableName, TableAttributes memory tableAttributes) public {
        address tableAddress = Clones.clone(tableImplementation);
        Table table = Table(tableAddress);
        table.initialize(_tableName, tableAttributes);

        tableCounter = tableCounter+1;
        tables[tableCounter] = tableAddress;


        emit TableCreated(tableCounter, _tableName);
    }
}
