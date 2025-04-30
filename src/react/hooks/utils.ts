import { env } from "@/types/core";

export function getUSDContractAddress(env: env) {
    // Mainnet USDC Token Address
    const USDC_MAINNET_ADDRESS = "0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC";

    // Devnet USDC Token Address
    const USDC_DEVNET_ADDRESS = "0xa1ec7fc00a6f40db9693ad1415d0c193ad3906494428cf252621037bd7117e29::usdc::USDC";

    if (env === 'prod') {
        return USDC_MAINNET_ADDRESS;
    }

    // Default to devnet
    return USDC_DEVNET_ADDRESS;
}