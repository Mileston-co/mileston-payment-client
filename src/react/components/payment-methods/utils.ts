import { Network, TokenMetadata } from "@/types"

export function getSupportedNetworks(params: Record<string, string>): Network[] {
    const allNetworks: Record<string, { name: string }> = {
        eth: { name: "Ethereum" },
        base: { name: "Base" },
        avax: { name: "Avalanche" },
        pol: { name: "Polygon" },
        arb: { name: "Arbitrum" },
        sui: { name: "Sui" },
    }

    return Object.keys(params).map((id) => ({
        id,
        name: allNetworks[id]?.name || id,
        icon: `https://assets.parqet.com/logos/crypto/${id.toUpperCase()}?format=png`,
    }))
}

export function getSupportedTokens(params: Record<string, string>): TokenMetadata[] {
    const tokenMap: Record<string, TokenMetadata[]> = {
        eth: [
            { id: "ETH", name: "Ethereum", symbol: "ETH", networkId: "eth", icon: "" },
            { id: "USDC", name: "USD Coin", symbol: "USDC", networkId: "eth", icon: "" },
            { id: "USDT", name: "Tether", symbol: "USDT", networkId: "eth", icon: "" },
        ],
        base: [
            { id: "ETH", name: "Ethereum", symbol: "ETH", networkId: "base", icon: "" },
            { id: "USDC", name: "USD Coin", symbol: "USDC", networkId: "base", icon: "" },
        ],
        avax: [
            { id: "AVAX", name: "Avalanche", symbol: "AVAX", networkId: "avax", icon: "" },
            { id: "USDT", name: "Tether USD", symbol: "USDT", networkId: "avax", icon: "" },
            { id: "USDC", name: "USD Coin", symbol: "USDC", networkId: "avax", icon: "" },
        ],
        pol: [
            { id: "POL", name: "Polygon", symbol: "POL", networkId: "pol", icon: "" },
            { id: "USDC", name: "USD Coin", symbol: "USDC", networkId: "pol", icon: "" },
        ],
        arb: [
            { id: "ETH", name: "Ethereum", symbol: "ETH", networkId: "arb", icon: "" },
            { id: "USDC", name: "USD Coin", symbol: "USDC", networkId: "arb", icon: "" },
        ],
        sui: [
            { id: "USDC", name: "USD Coin", symbol: "USDC", networkId: "sui", icon: "" },
        ],
    }

    const formatIcon = (name: string, symbol: string) =>
        `https://assets.parqet.com/logos/crypto/${symbol}?format=png`

    const tokens: TokenMetadata[] = []

    for (const [chainId, address] of Object.entries(params)) {
        const supported = tokenMap[chainId]
        if (supported) {
            supported.forEach((t) => {
                tokens.push({
                    ...t,
                    icon: formatIcon(t.name, t.symbol),
                })
            })
        }
    }

    return tokens
}
