// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract WebArchive {
    address owner;

    // map[userAddress][hash] = timeStamp
    mapping(address => mapping(bytes32 => uint)) archivedItemsMap;

    event ArchiveCreated(
        address indexed user,
        bytes32 itemHash,
        uint256 timestamp
    );

    constructor() {
        owner = msg.sender;
    }

    function setArchive(bytes32 _itemHash) public {
        archivedItemsMap[msg.sender][_itemHash] = block.timestamp;

        emit ArchiveCreated(msg.sender, _itemHash, block.timestamp);
    }

    function verifyHash(address user, bytes32 hash) public view returns (bool) {
        return archivedItemsMap[user][hash] != 0;
    }
}
