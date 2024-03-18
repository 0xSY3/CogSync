// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

struct TableAttributes  {
    string id;
    string[] columns;
    bool protected; // if can 
}

struct Column {
    string name;
    TypeEnum _type;
}

// TODO look into it
enum TypeEnum {
    String,
    Number
}

struct Row {
    uint256 id;
    string[] data;
}

