import {
    avalanche,
    avalancheFuji,
    base,
    baseSepolia,
    polygon,
    polygonAmoy,
    arbitrum,
    arbitrumSepolia,
    mainnet,
    sepolia
} from "viem/chains";
import {
    evmType,
    env,
    PaymentType
} from "../types";

export const usdtABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_upgradedAddress", "type": "address" }], "name": "deprecate", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "deprecated", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_evilUser", "type": "address" }], "name": "addBlackList", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "upgradedAddress", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "balances", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "maximumFee", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "_totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "unpause", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_maker", "type": "address" }], "name": "getBlackListStatus", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }], "name": "allowed", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "paused", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "who", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "pause", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getOwner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "newBasisPoints", "type": "uint256" }, { "name": "newMaxFee", "type": "uint256" }], "name": "setParams", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "amount", "type": "uint256" }], "name": "issue", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "amount", "type": "uint256" }], "name": "redeem", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "basisPointsRate", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "isBlackListed", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_clearedUser", "type": "address" }], "name": "removeBlackList", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "MAX_UINT", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_blackListedUser", "type": "address" }], "name": "destroyBlackFunds", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "name": "_initialSupply", "type": "uint256" }, { "name": "_name", "type": "string" }, { "name": "_symbol", "type": "string" }, { "name": "_decimals", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "amount", "type": "uint256" }], "name": "Issue", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "amount", "type": "uint256" }], "name": "Redeem", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "newAddress", "type": "address" }], "name": "Deprecate", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "feeBasisPoints", "type": "uint256" }, { "indexed": false, "name": "maxFee", "type": "uint256" }], "name": "Params", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_blackListedUser", "type": "address" }, { "indexed": false, "name": "_balance", "type": "uint256" }], "name": "DestroyedBlackFunds", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_user", "type": "address" }], "name": "AddedBlackList", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_user", "type": "address" }], "name": "RemovedBlackList", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [], "name": "Pause", "type": "event" }, { "anonymous": false, "inputs": [], "name": "Unpause", "type": "event" }]

export const usdcABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "authorizer",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "nonce",
                "type": "bytes32"
            }
        ],
        "name": "AuthorizationCanceled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "authorizer",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "nonce",
                "type": "bytes32"
            }
        ],
        "name": "AuthorizationUsed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_account",
                "type": "address"
            }
        ],
        "name": "Blacklisted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "newBlacklister",
                "type": "address"
            }
        ],
        "name": "BlacklisterChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "burner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Burn",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "newMasterMinter",
                "type": "address"
            }
        ],
        "name": "MasterMinterChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "minter",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Mint",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "minter",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "minterAllowedAmount",
                "type": "uint256"
            }
        ],
        "name": "MinterConfigured",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "oldMinter",
                "type": "address"
            }
        ],
        "name": "MinterRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [],
        "name": "Pause",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "newAddress",
                "type": "address"
            }
        ],
        "name": "PauserChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "newRescuer",
                "type": "address"
            }
        ],
        "name": "RescuerChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_account",
                "type": "address"
            }
        ],
        "name": "UnBlacklisted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [],
        "name": "Unpause",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "CANCEL_AUTHORIZATION_TYPEHASH",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "DOMAIN_SEPARATOR",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "PERMIT_TYPEHASH",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "RECEIVE_WITH_AUTHORIZATION_TYPEHASH",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "TRANSFER_WITH_AUTHORIZATION_TYPEHASH",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "authorizer",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "nonce",
                "type": "bytes32"
            }
        ],
        "name": "authorizationState",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_account",
                "type": "address"
            }
        ],
        "name": "blacklist",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "blacklister",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "authorizer",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "nonce",
                "type": "bytes32"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "cancelAuthorization",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "minter",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "minterAllowedAmount",
                "type": "uint256"
            }
        ],
        "name": "configureMinter",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "currency",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "decrement",
                "type": "uint256"
            }
        ],
        "name": "decreaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "increment",
                "type": "uint256"
            }
        ],
        "name": "increaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "tokenName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "tokenSymbol",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "tokenCurrency",
                "type": "string"
            },
            {
                "internalType": "uint8",
                "name": "tokenDecimals",
                "type": "uint8"
            },
            {
                "internalType": "address",
                "name": "newMasterMinter",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "newPauser",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "newBlacklister",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "newName",
                "type": "string"
            }
        ],
        "name": "initializeV2",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "lostAndFound",
                "type": "address"
            }
        ],
        "name": "initializeV2_1",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_account",
                "type": "address"
            }
        ],
        "name": "isBlacklisted",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "isMinter",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "masterMinter",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "mint",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "minter",
                "type": "address"
            }
        ],
        "name": "minterAllowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "nonces",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "paused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pauser",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "permit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "validAfter",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "validBefore",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "nonce",
                "type": "bytes32"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "receiveWithAuthorization",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "minter",
                "type": "address"
            }
        ],
        "name": "removeMinter",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "tokenContract",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "rescueERC20",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "rescuer",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "validAfter",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "validBefore",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "nonce",
                "type": "bytes32"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "transferWithAuthorization",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_account",
                "type": "address"
            }
        ],
        "name": "unBlacklist",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "unpause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_newBlacklister",
                "type": "address"
            }
        ],
        "name": "updateBlacklister",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_newMasterMinter",
                "type": "address"
            }
        ],
        "name": "updateMasterMinter",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_newPauser",
                "type": "address"
            }
        ],
        "name": "updatePauser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newRescuer",
                "type": "address"
            }
        ],
        "name": "updateRescuer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "version",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

export const efficientPayAbi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }], "name": "AddressEmptyCode", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "implementation", "type": "address" }], "name": "ERC1967InvalidImplementation", "type": "error" }, { "inputs": [], "name": "ERC1967NonPayable", "type": "error" }, { "inputs": [], "name": "FailedCall", "type": "error" }, { "inputs": [], "name": "InvalidInitialization", "type": "error" }, { "inputs": [], "name": "NotInitializing", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "OwnableInvalidOwner", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "OwnableUnauthorizedAccount", "type": "error" }, { "inputs": [], "name": "ReentrancyGuardReentrantCall", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }], "name": "SafeERC20FailedOperation", "type": "error" }, { "inputs": [], "name": "UUPSUnauthorizedCallContext", "type": "error" }, { "inputs": [{ "internalType": "bytes32", "name": "slot", "type": "bytes32" }], "name": "UUPSUnsupportedProxiableUUID", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "address[]", "name": "recipients", "type": "address[]" }, { "indexed": false, "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }, { "indexed": false, "internalType": "uint256", "name": "total", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "fee", "type": "uint256" }], "name": "BatchPayment", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "payer", "type": "address" }, { "indexed": false, "internalType": "address", "name": "tokenIn", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "reason", "type": "string" }], "name": "DebugSwapError", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "oldFeeReceiver", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newFeeReceiver", "type": "address" }], "name": "FeeReceiverUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint64", "name": "version", "type": "uint64" }], "name": "Initialized", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "payer", "type": "address" }, { "indexed": true, "internalType": "address", "name": "merchant", "type": "address" }, { "indexed": true, "internalType": "address", "name": "tokenIn", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amountUSDC", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "fee", "type": "uint256" }, { "indexed": false, "internalType": "bytes32", "name": "txHash", "type": "bytes32" }], "name": "PaymentProcessed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "token", "type": "address" }, { "indexed": false, "internalType": "string", "name": "symbol", "type": "string" }], "name": "SupportedTokenAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "token", "type": "address" }], "name": "SupportedTokenRemoved", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "payer", "type": "address" }, { "indexed": false, "internalType": "address", "name": "tokenIn", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amountOutUSDC", "type": "uint256" }], "name": "TokenSwapped", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "implementation", "type": "address" }], "name": "Upgraded", "type": "event" }, { "inputs": [], "name": "BPS_DENOM", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "FEE_BPS", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "UNISWAP_POOL_FEE", "outputs": [{ "internalType": "uint24", "name": "", "type": "uint24" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "UPGRADE_INTERFACE_VERSION", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "USDC", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "string", "name": "symbol", "type": "string" }], "name": "addSupportedToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "recipients", "type": "address[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "name": "batchPayUSDC", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "feeReceiver", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "merchant", "type": "address" }], "name": "getMerchantHistory", "outputs": [{ "components": [{ "internalType": "address", "name": "payer", "type": "address" }, { "internalType": "address", "name": "merchant", "type": "address" }, { "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountUSDC", "type": "uint256" }, { "internalType": "uint256", "name": "fee", "type": "uint256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "bytes32", "name": "txHash", "type": "bytes32" }], "internalType": "struct EfficientPay.PaymentRecord[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "wallet", "type": "address" }], "name": "getPaymentHistory", "outputs": [{ "components": [{ "internalType": "address", "name": "payer", "type": "address" }, { "internalType": "address", "name": "merchant", "type": "address" }, { "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountUSDC", "type": "uint256" }, { "internalType": "uint256", "name": "fee", "type": "uint256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "bytes32", "name": "txHash", "type": "bytes32" }], "internalType": "struct EfficientPay.PaymentRecord[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "supportedTokens", "type": "address[]" }, { "internalType": "string[]", "name": "symbols", "type": "string[]" }, { "internalType": "address", "name": "_usdc", "type": "address" }, { "internalType": "address", "name": "_nativeToken", "type": "address" }, { "internalType": "address", "name": "_swapRouter", "type": "address" }, { "internalType": "address", "name": "feeReceiver_", "type": "address" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "isSupportedToken", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "merchantHistory", "outputs": [{ "internalType": "address", "name": "payer", "type": "address" }, { "internalType": "address", "name": "merchant", "type": "address" }, { "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountUSDC", "type": "uint256" }, { "internalType": "uint256", "name": "fee", "type": "uint256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "bytes32", "name": "txHash", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "nativeToken", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "merchant", "type": "address" }, { "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "minAmountOut", "type": "uint256" }], "name": "pay", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "paymentHistory", "outputs": [{ "internalType": "address", "name": "payer", "type": "address" }, { "internalType": "address", "name": "merchant", "type": "address" }, { "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountUSDC", "type": "uint256" }, { "internalType": "uint256", "name": "fee", "type": "uint256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "bytes32", "name": "txHash", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "paymentSuccess", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "proxiableUUID", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }], "name": "removeSupportedToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_feeReceiver", "type": "address" }], "name": "setFeeReceiver", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_nativeToken", "type": "address" }], "name": "setNativeToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_swapRouter", "type": "address" }], "name": "setSwapRouter", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_usdc", "type": "address" }], "name": "setUSDC", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "minAmountOut", "type": "uint256" }], "name": "swapNativeToUSDC", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "swapRouter", "outputs": [{ "internalType": "contract IV3SwapRouter", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "minAmountOut", "type": "uint256" }], "name": "swapToUSDC", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "tokenSymbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newImplementation", "type": "address" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "upgradeToAndCall", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "txHash", "type": "bytes32" }], "name": "wasPaymentSuccessful", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "withdrawStuckETH", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }], "name": "withdrawStuckToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }]

export function getChain(env: env, evm: evmType) {
    const chains = {
        avax: {
            prod: avalanche,
            test: avalancheFuji
        },
        base: {
            prod: base,
            test: baseSepolia
        },
        pol: {
            prod: polygon,
            test: polygonAmoy
        },
        arb: {
            prod: arbitrum,
            test: arbitrumSepolia
        },
        eth: {
            prod: mainnet,
            test: sepolia
        }
    };

    return chains[evm][env];
}

export function getUsdcEVMContractAddress(env: env, evm: evmType) {
    const addresses = {
        avax: {
            prod: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
            test: "0x5425890298aed601595a70AB815c96711a31Bc65"
        },
        base: {
            prod: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
            test: "0x036CbD53842c5426634e7929541eC2318f3dCF7e"
        },
        pol: {
            prod: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
            test: "0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582"
        },
        arb: {
            prod: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
            test: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d"
        },
        eth: {
            prod: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            test: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"
        }
    };

    return addresses[evm][env];
}

export function getUsdtEVMContractAddress(env: env, evm: evmType) {
    const addresses = {
        avax: {
            prod: "0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7",
            test: null
        },
        eth: {
            prod: "0xdac17f958d2ee523a2206206994597c13d831ec7",
            test: null
        }
    };

    if (!(evm in addresses)) {
        throw new Error(`Unsupported evmType: ${evm}`);
    }

    return addresses[evm as keyof typeof addresses][env];
}

export function getEfficientPayProxyContractAddress(
    env: "test" | "prod",
    evmType: 'avax' | 'base' | 'pol' | 'eth' | 'arb'
): string {
    const addresses = {
        // Updated based on the provided logs
        avax: {
            // Avalanche Mainnet: From logs: EfficientPay Proxy deployed at: 0xEcb82f0Cb252682cE13e6a2FBB6dB9711a5B05A2
            prod: "0xEcb82f0Cb252682cE13e6a2FBB6dB9711a5B05A2", 
            // Fuji Testnet: From previous README: 0x440150ef4A9D89ED6d72F11608550bD035a8CEE7
            test: "0x440150ef4A9D89ED6d72F11608550bD035a8CEE7"   
        },
        base: {
            // Base Mainnet: From logs: EfficientPay Proxy deployed at: 0xcC2541B7A5d7FC65a43Af221933C298c45Dcc12c
            prod: "0xcC2541B7A5d7FC65a43Af221933C298c45Dcc12c", 
            // Base Sepolia Testnet: From previous README: 0x70f1D3693d5B8F066acE537132Cbc61201bb6396
            test: "0x70f1D3693d5B8F066acE537132Cbc61201bb6396"   
        },
        pol: {
            // Polygon Mainnet: From logs: EfficientPay Proxy deployed at: 0xdDeC3AfFd91d6639f6F0c903a195019cdF23B1eD
            prod: "0xdDeC3AfFd91d6639f6F0c903a195019cdF23B1eD", 
            // Amoy Testnet (Polygon): From previous README: 0x209097757c380b192460f45a31f55c159dC8Ab8C (using this as Amoy)
            test: "0x209097757c380b192460f45a31f55c159dC8Ab8C"   
        },
        arb: {
            // Arbitrum Mainnet: From logs: EfficientPay Proxy deployed at: 0x2A111508724bb4dBC4093796a9Cf0c67507f6ABC
            prod: "0x2A111508724bb4dBC4093796a9Cf0c67507f6ABC", 
            // Arbitrum Sepolia Testnet: From previous README: 0xd8aC2a3D797aCbFd2BA3f3873c07A6B368eAF007
            test: "0xd8aC2a3D797aCbFd2BA3f3873c07A6B368eAF007"   
        },
        eth: {
            // Ethereum Mainnet: From logs: EfficientPay Proxy deployed at: 0x411CD8A16C24c6c450B2F502FAEf63B4D70fB1a9
            prod: "0x411CD8A16C24c6c450B2F502FAEf63B4D70fB1a9", 
            // Sepolia Testnet (Ethereum): From previous README: 0xA8fED2dD2DBFd9d03047462d1f8f669c1687c296
            test: "0xA8fED2dD2DBFd9d03047462d1f8f669c1687c296"   
        }
    };

    if (!addresses[evmType] || !addresses[evmType][env]) {
        throw new Error(`Proxy contract address not found for the specified chain (${evmType}) and environment (${env}).`);
    }

    return addresses[evmType][env];
}

export const patternMap: Record<PaymentType, string> = {
    invoice: 'invoice.save',
    'payment-link': 'paymentlink.save',
    recurring: 'recurring.save',
};

export const BASE_URL = 'https://checkout-service.mileston.co/checkout'


// Price cache
const priceCache: { [token: string]: { price: number; timestamp: number } } = {};

// Mapping from internal token symbol to CoinGecko ID
const tokenToCoingeckoId: { [symbol: string]: string } = {
    ETH: 'ethereum',
    POL: 'matic-network',
    SUI: 'sui',
    AVAX: 'avalanche-2',
    USDC: 'usd-coin',
    USDT: 'tether',
    SOL: 'solana',
};

// Function to fetch token price in USD
export async function getTokenPriceUSD(tokenSymbol: string): Promise<number | null> {
    const symbol = tokenSymbol.toUpperCase();
    const cached = priceCache[symbol];
    if (cached && Date.now() - cached.timestamp < 3600000) {
        console.log("Cache Hit:", cached);
        return cached.price;
    }

    try {
        const coingeckoIds = Object.values(tokenToCoingeckoId).join(',');
        const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoIds}&vs_currencies=usd`, {
            headers: {
                'x-cg-demo-api-key': 'CG-13fTWkgsW6GkmVdg9mm6eqU7',
            },
        });

        const data = await res.json();
        console.log("Data from CoinGecko:", data);

        // Cache all prices at once
        for (const [symbolKey, cgId] of Object.entries(tokenToCoingeckoId)) {
            const price = data[cgId]?.usd;
            if (price) {
                priceCache[symbolKey] = {
                    price,
                    timestamp: Date.now(),
                };
            }
        }

        console.log("Price from query:", priceCache[symbol]?.price ?? null);

        return priceCache[symbol]?.price ?? null;
    } catch (error) {
        console.error('🔥 Failed to fetch token prices:', error);
        return null;
    }
}

// Add Solana token addresses
export function getSolanaTokenAddress(env: env, token: 'USDC' | 'USDT') {
    const addresses = {
        USDC: {
            prod: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // Mainnet USDC
            test: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"  // Devnet USDC
        },
        USDT: {
            prod: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", // Mainnet USDT
            test: "DXMf5eKK9RgHhKGQYwDxrR9rBJwrp4rZvmrczuALAuGr"  // Devnet USDT
        }
    };

    return addresses[token][env];
}