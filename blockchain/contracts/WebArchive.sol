// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract WebArchive {
    address public owner;

    // map[userAddress][hash] = timeStamp
    mapping(address => mapping(bytes32 => uint)) internal archivedItemsMap;

    event ArchiveCreated(
        address indexed user,
        bytes32 itemHash,
        uint256 timestamp
    );

    error AlreadyArchived();

    constructor() {
        owner = msg.sender;
    }

    function setArchive(bytes32 _itemHash) public {
        if (archivedItemsMap[msg.sender][_itemHash] != 0)
            revert AlreadyArchived();

        archivedItemsMap[msg.sender][_itemHash] = block.timestamp;

        emit ArchiveCreated(msg.sender, _itemHash, block.timestamp);
    }

    function verifyHash(address user, bytes32 hash) public view returns (bool) {
        return archivedItemsMap[user][hash] != 0;
    }

    function getArchiveTimestamp(
        address user,
        bytes32 hash
    ) public view returns (uint) {
        return archivedItemsMap[user][hash];
    }
}
