// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./CollaborativeDatabase.sol";


// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract DBManager {
    address public owner;
    address public dbImplementation;
    address public tableImplementation;
    mapping (uint256 => address) public deployedDatabases;
    mapping (address => uint256) public databaseOwners;
    uint256 public databaseCounter;

    event DBCreated(address indexed dbAddress, string name, uint256 databaseId);

    constructor(address _dbImplementation,address _tableImplementation) payable {
        owner = payable(msg.sender);
        dbImplementation =_dbImplementation;
        tableImplementation =_tableImplementation;
    }

    function createNewDb(address _owner, string memory _dbName) public {
        address dbAddress = Clones.clone(dbImplementation);
        DB database = DB(dbAddress);
        database.initialize(_owner, _dbName, tableImplementation);

        databaseCounter = databaseCounter +1;
        deployedDatabases[databaseCounter] = dbAddress;
        databaseOwners[_owner] = databaseCounter;
        emit DBCreated(dbAddress, _dbName, databaseCounter);
    }
}
