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
        constant: false,
        inputs: [
            { name: '_to', type: 'address' },
            { name: '_value', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ name: '', type: 'bool' }],
        type: 'function',
    },
];

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

export const patternMap: Record<PaymentType, string> = {
    invoice: 'invoice.save',
    'payment-link': 'paymentlink.save',
    recurring: 'recurring.save',
};

export const BASE_URL = 'https://checkout-service.mileton.co/checkout'


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