// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./structs/Subnet.sol";
import "./lib/FvmAddressHelper.sol";

contract NetworkBride {
    SubnetID public subnetID;
    address public dbManager;

    event NetworkBrideRead(CallMsg message, IPCAddress destination);

    constructor(uint64 root, address[] memory route, address _dbManager) {
        subnetID = SubnetID({root: root, route: route});
        dbManager = _dbManager;
    }

    function callDbManagerOnSubnet() public {
        // Pack the message to send to the other side of the linked token.
        CallMsg memory message = CallMsg({
            method: abi.encodePacked(bytes4(keccak256("deployedDatabases()"))),
            params: abi.encode()
        });
        IPCAddress memory destination = IPCAddress({
            subnetId: subnetID,
            rawAddress: FvmAddressHelper.from(dbManager)
        });

        
        // call TBI

        emit NetworkBrideRead(message, destination);
    }

    function _fallback() internal {
        // TBI
    }
}
