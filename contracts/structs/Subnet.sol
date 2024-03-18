// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
struct SubnetID {
    /// @notice chainID of the root subnet
    uint64 root;
    /// @notice parent path of the subnet
    address[] route;
}

/// @notice Message format used for `Transfer` and `Call` messages.
struct CallMsg {
    /// @dev Target method. A bytes4 function selector for EVM/Solidity targets, or a uint64 for Wasm actors.
    bytes method;
    /// @dev arguments of the method being called.
    bytes params;
}
struct FvmAddress {
    uint8 addrType;
    bytes payload;
}

struct IPCAddress {
    SubnetID subnetId;
    FvmAddress rawAddress;
}

struct DelegatedAddress {
    uint64 namespace;
    uint128 length;
    bytes buffer;
}