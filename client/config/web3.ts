export const DEPLOYED_CONTRACT_ADDRESS =
  "0xB91aA23Ae4197A375d704b72a7d0B560148f6B92";
export const CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "itemHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "screenshotUrl",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "transactionHash",
        type: "bytes32",
      },
    ],
    name: "ArchiveCreated",
    type: "event",
  },
  {
    inputs: [],
    name: "getArchives",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "itemHash",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "screenshotUrl",
            type: "string",
          },
          {
            internalType: "bytes32",
            name: "transactionHash",
            type: "bytes32",
          },
        ],
        internalType: "struct WebArchive.ArchiveItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userAddress",
        type: "address",
      },
    ],
    name: "getArchivesByUser",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "itemHash",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "screenshotUrl",
            type: "string",
          },
          {
            internalType: "bytes32",
            name: "transactionHash",
            type: "bytes32",
          },
        ],
        internalType: "struct WebArchive.ArchiveItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_itemHash",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "_screenshotUrl",
        type: "string",
      },
    ],
    name: "setArchive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
