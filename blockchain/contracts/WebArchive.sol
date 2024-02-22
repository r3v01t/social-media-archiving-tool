// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract WebArchive {
    // map[userAddress][pHash] => doesHashExist
    mapping(address => mapping(bytes32 => bool)) public archivedItems;

    event ArchiveCreated(
        address indexed user,
        uint256 timestamp,
        bytes32 ipAddress,
        bytes32 pHash,
        string webpageUrl
    );

    error AlreadyArchived();

    constructor() {}

    function setArchive(
        uint256 _timestamp,
        bytes32 _ipAddress,
        bytes32 _pHash,
        string memory _webpageUrl
    ) public {
        if (archivedItems[msg.sender][_pHash]) {
            revert AlreadyArchived();
        }

        archivedItems[msg.sender][_pHash] = true;

        emit ArchiveCreated(
            msg.sender,
            _timestamp,
            _ipAddress,
            _pHash,
            _webpageUrl
        );
    }

    function verifyHash(
        address _user,
        bytes32 _hash
    ) public view returns (bool) {
        return archivedItems[_user][_hash];
    }
}
