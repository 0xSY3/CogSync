// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "solidity-rlp/contracts/RLPReader.sol";
import "hardhat/console.sol";

import {TableAttributes, Row} from "./structs/TableStructs.sol";

// Uncomment this line to use console.log

contract Table is Initializable {
    string public tableName;
    address public db;
    address public rowImplementation;
    TableAttributes public tableAttributes;
    uint256 public rowCounter;
    mapping(uint256 => Row) rows;

    event Insert(address table, uint256 index);

    constructor() {}

    function initialize(
        string memory _tableName,
        TableAttributes memory _tableAttributes
    ) external initializer {
        db = msg.sender;
        tableName = _tableName;
        tableAttributes = _tableAttributes;
    }

    function create(string[] memory _data) public {
        rowCounter = rowCounter + 1;
        Row memory row = Row({id: rowCounter, data: _data});
        rows[rowCounter] = row;
    }

    function getAllRows() public view returns (Row[] memory) {
        Row[] memory allRowsData = new Row[](rowCounter);

        for (uint256 i = 1; i <= rowCounter; i++) {
            Row memory row = getRowById(i);
            allRowsData[i - 1] = row;
        }

        return allRowsData;
    }

    function getRowById(uint256 _index) public view returns (Row memory) {
        return rows[_index];
    }

    function update() public {}
    function del() public {}
    function updateTable() public {}
}
