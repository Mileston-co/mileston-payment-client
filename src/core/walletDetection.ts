export interface DetectedWallet {
  name: string;
  icon: string;
  isInstalled: boolean;
  isConnected: boolean;
  address?: string;
  provider?: any;
}

export interface WalletDetectionResult {
  wallets: DetectedWallet[];
  hasAnyWallet: boolean;
  connectedWallet?: DetectedWallet;
}

/**
 * Detects available EVM wallets in the browser
 */
export function detectEVMWallets(): WalletDetectionResult {
  const wallets: DetectedWallet[] = [
    {
      name: 'MetaMask',
      icon: '🦊',
      isInstalled: false,
      isConnected: false,
    },
    {
      name: 'Core Wallet',
      icon: '🔷',
      isInstalled: false,
      isConnected: false,
    },
    {
      name: 'WalletConnect',
      icon: '🔗',
      isInstalled: false,
      isConnected: false,
    },
    {
      name: 'Coinbase Wallet',
      icon: '🪙',
      isInstalled: false,
      isConnected: false,
    },
    {
      name: 'Trust Wallet',
      icon: '🛡️',
      isInstalled: false,
      isConnected: false,
    },
    {
      name: 'Rainbow',
      icon: '🌈',
      isInstalled: false,
      isConnected: false,
    },
    {
      name: 'Phantom',
      icon: '👻',
      isInstalled: false,
      isConnected: false,
    },
    {
      name: 'Brave Wallet',
      icon: '🦁',
      isInstalled: false,
      isConnected: false,
    },
    {
      name: 'OKX Wallet',
      icon: '⚡',
      isInstalled: false,
      isConnected: false,
    },
    {
      name: 'Rabby Wallet',
      icon: '🐰',
      isInstalled: false,
      isConnected: false,
    },
    {
      name: 'TokenPocket',
      icon: '💼',
      isInstalled: false,
      isConnected: false,
    },
    {
      name: 'Bitget Wallet',
      icon: '🟡',
      isInstalled: false,
      isConnected: false,
    },
    {
      name: 'Bybit Wallet',
      icon: '📊',
      isInstalled: false,
      isConnected: false,
    },
    {
      name: 'Gate Wallet',
      icon: '🚪',
      isInstalled: false,
      isConnected: false,
    },
    {
      name: 'Huobi Wallet',
      icon: '🔥',
      isInstalled: false,
      isConnected: false,
    },
    {
      name: 'Binance Wallet',
      icon: '🟡',
      isInstalled: false,
      isConnected: false,
    },
  ];

  let hasAnyWallet = false;
  let connectedWallet: DetectedWallet | undefined;

  // Check for MetaMask
  if (typeof window !== 'undefined' && window.ethereum) {
    const ethereum = window.ethereum;
    
    // MetaMask
    if (ethereum.isMetaMask) {
      wallets[0].isInstalled = true;
      hasAnyWallet = true;
      
      // Check if connected
      if (ethereum.selectedAddress) {
        wallets[0].isConnected = true;
        wallets[0].address = ethereum.selectedAddress;
        wallets[0].provider = ethereum;
        connectedWallet = wallets[0];
      }
    }

    // Check for other wallet providers
    if (ethereum.isCoinbaseWallet) {
      wallets[3].isInstalled = true;
      hasAnyWallet = true;
      if (ethereum.selectedAddress) {
        wallets[3].isConnected = true;
        wallets[3].address = ethereum.selectedAddress;
        wallets[3].provider = ethereum;
        connectedWallet = wallets[3];
      }
    }

    if (ethereum.isTrust) {
      wallets[4].isInstalled = true;
      hasAnyWallet = true;
      if (ethereum.selectedAddress) {
        wallets[4].isConnected = true;
        wallets[4].address = ethereum.selectedAddress;
        wallets[4].provider = ethereum;
        connectedWallet = wallets[4];
      }
    }

    if (ethereum.isRainbow) {
      wallets[5].isInstalled = true;
      hasAnyWallet = true;
      if (ethereum.selectedAddress) {
        wallets[5].isConnected = true;
        wallets[5].address = ethereum.selectedAddress;
        wallets[5].provider = ethereum;
        connectedWallet = wallets[5];
      }
    }

    if (ethereum.isPhantom) {
      wallets[6].isInstalled = true;
      hasAnyWallet = true;
      if (ethereum.selectedAddress) {
        wallets[6].isConnected = true;
        wallets[6].address = ethereum.selectedAddress;
        wallets[6].provider = ethereum;
        connectedWallet = wallets[6];
      }
    }

    if (ethereum.isBraveWallet) {
      wallets[7].isInstalled = true;
      hasAnyWallet = true;
      if (ethereum.selectedAddress) {
        wallets[7].isConnected = true;
        wallets[7].address = ethereum.selectedAddress;
        wallets[7].provider = ethereum;
        connectedWallet = wallets[7];
      }
    }

    if (ethereum.isOkxWallet) {
      wallets[8].isInstalled = true;
      hasAnyWallet = true;
      if (ethereum.selectedAddress) {
        wallets[8].isConnected = true;
        wallets[8].address = ethereum.selectedAddress;
        wallets[8].provider = ethereum;
        connectedWallet = wallets[8];
      }
    }

    // Check for Core Wallet
    if (ethereum.isCoreWallet || ethereum.isAvalanche) {
      wallets[1].isInstalled = true;
      hasAnyWallet = true;
      if (ethereum.selectedAddress) {
        wallets[1].isConnected = true;
        wallets[1].address = ethereum.selectedAddress;
        wallets[1].provider = ethereum;
        connectedWallet = wallets[1];
      }
    }

    // Check for Rabby Wallet
    if (ethereum.isRabby) {
      wallets[9].isInstalled = true;
      hasAnyWallet = true;
      if (ethereum.selectedAddress) {
        wallets[9].isConnected = true;
        wallets[9].address = ethereum.selectedAddress;
        wallets[9].provider = ethereum;
        connectedWallet = wallets[9];
      }
    }

    // Check for TokenPocket
    if (ethereum.isTokenPocket) {
      wallets[10].isInstalled = true;
      hasAnyWallet = true;
      if (ethereum.selectedAddress) {
        wallets[10].isConnected = true;
        wallets[10].address = ethereum.selectedAddress;
        wallets[10].provider = ethereum;
        connectedWallet = wallets[10];
      }
    }

    // Check for Bitget Wallet
    if (ethereum.isBitgetWallet) {
      wallets[11].isInstalled = true;
      hasAnyWallet = true;
      if (ethereum.selectedAddress) {
        wallets[11].isConnected = true;
        wallets[11].address = ethereum.selectedAddress;
        wallets[11].provider = ethereum;
        connectedWallet = wallets[11];
      }
    }

    // Check for Bybit Wallet
    if (ethereum.isBybitWallet) {
      wallets[12].isInstalled = true;
      hasAnyWallet = true;
      if (ethereum.selectedAddress) {
        wallets[12].isConnected = true;
        wallets[12].address = ethereum.selectedAddress;
        wallets[12].provider = ethereum;
        connectedWallet = wallets[12];
      }
    }

    // Check for Gate Wallet
    if (ethereum.isGateWallet) {
      wallets[13].isInstalled = true;
      hasAnyWallet = true;
      if (ethereum.selectedAddress) {
        wallets[13].isConnected = true;
        wallets[13].address = ethereum.selectedAddress;
        wallets[13].provider = ethereum;
        connectedWallet = wallets[13];
      }
    }

    // Check for Huobi Wallet
    if (ethereum.isHuobiWallet) {
      wallets[14].isInstalled = true;
      hasAnyWallet = true;
      if (ethereum.selectedAddress) {
        wallets[14].isConnected = true;
        wallets[14].address = ethereum.selectedAddress;
        wallets[14].provider = ethereum;
        connectedWallet = wallets[14];
      }
    }

    // Check for Binance Wallet
    if (ethereum.isBinanceWallet || ethereum.isBinanceChainWallet) {
      wallets[15].isInstalled = true;
      hasAnyWallet = true;
      if (ethereum.selectedAddress) {
        wallets[15].isConnected = true;
        wallets[15].address = ethereum.selectedAddress;
        wallets[15].provider = ethereum;
        connectedWallet = wallets[15];
      }
    }
  }

  // Check for WalletConnect (if available)
  if (typeof window !== 'undefined' && (window as any).WalletConnect) {
    wallets[2].isInstalled = true;
    hasAnyWallet = true;
  }

  // Additional detection methods for wallets that might not set specific flags
  if (typeof window !== 'undefined') {
    // Check for Core Wallet by looking for specific properties
    if ((window as any).avalanche || (window as any).core) {
      wallets[1].isInstalled = true;
      hasAnyWallet = true;
    }

    // Check for other wallets that might be injected
    if ((window as any).rabby) {
      wallets[9].isInstalled = true;
      hasAnyWallet = true;
    }

    if ((window as any).tokenpocket) {
      wallets[10].isInstalled = true;
      hasAnyWallet = true;
    }

    if ((window as any).bitget) {
      wallets[11].isInstalled = true;
      hasAnyWallet = true;
    }

    if ((window as any).bybit) {
      wallets[12].isInstalled = true;
      hasAnyWallet = true;
    }

    if ((window as any).gate) {
      wallets[13].isInstalled = true;
      hasAnyWallet = true;
    }

    if ((window as any).huobi) {
      wallets[14].isInstalled = true;
      hasAnyWallet = true;
    }

    if ((window as any).binance) {
      wallets[15].isInstalled = true;
      hasAnyWallet = true;
    }
  }

  return {
    wallets: wallets.filter(wallet => wallet.isInstalled),
    hasAnyWallet,
    connectedWallet,
  };
}

/**
 * Connects to a specific wallet
 */
export async function connectToWallet(wallet: DetectedWallet): Promise<{ address: string; provider: any }> {
  if (!wallet.isInstalled) {
    throw new Error(`${wallet.name} is not installed`);
  }

  if (wallet.isConnected && wallet.address && wallet.provider) {
    return {
      address: wallet.address,
      provider: wallet.provider,
    };
  }

  // For now, we'll use the default ethereum provider
  // In a more sophisticated implementation, you'd handle different wallet types
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      
      if (accounts && accounts.length > 0) {
        return {
          address: accounts[0],
          provider: window.ethereum,
        };
      }
    } catch (error) {
      throw new Error(`Failed to connect to ${wallet.name}: ${error}`);
    }
  }

  throw new Error(`No wallet provider available for ${wallet.name}`);
}

/**
 * Gets the current connected wallet address
 */
export async function getCurrentWalletAddress(): Promise<string | null> {
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });
      
      if (accounts && accounts.length > 0) {
        return accounts[0];
      }
    } catch (error) {
      console.error('Error getting current wallet address:', error);
    }
  }
  
  return null;
}

/**
 * Gets wallet-specific connection methods
 */
export function getWalletConnectionMethod(walletName: string): string {
  const connectionMethods: Record<string, string> = {
    'MetaMask': 'window.ethereum.request({ method: "eth_requestAccounts" })',
    'Core Wallet': 'window.ethereum.request({ method: "eth_requestAccounts" })',
    'Coinbase Wallet': 'window.ethereum.request({ method: "eth_requestAccounts" })',
    'Trust Wallet': 'window.ethereum.request({ method: "eth_requestAccounts" })',
    'Rainbow': 'window.ethereum.request({ method: "eth_requestAccounts" })',
    'Phantom': 'window.ethereum.request({ method: "eth_requestAccounts" })',
    'Brave Wallet': 'window.ethereum.request({ method: "eth_requestAccounts" })',
    'OKX Wallet': 'window.ethereum.request({ method: "eth_requestAccounts" })',
    'Rabby Wallet': 'window.ethereum.request({ method: "eth_requestAccounts" })',
    'TokenPocket': 'window.ethereum.request({ method: "eth_requestAccounts" })',
    'Bitget Wallet': 'window.ethereum.request({ method: "eth_requestAccounts" })',
    'Bybit Wallet': 'window.ethereum.request({ method: "eth_requestAccounts" })',
    'Gate Wallet': 'window.ethereum.request({ method: "eth_requestAccounts" })',
    'Huobi Wallet': 'window.ethereum.request({ method: "eth_requestAccounts" })',
    'Binance Wallet': 'window.ethereum.request({ method: "eth_requestAccounts" })',
    'WalletConnect': 'WalletConnect.connect()',
  };

  return connectionMethods[walletName] || 'Standard Ethereum request';
}

/**
 * Checks if a specific wallet is available
 */
export function isWalletAvailable(walletName: string): boolean {
  const detectionResult = detectEVMWallets();
  return detectionResult.wallets.some(wallet => 
    wallet.name === walletName && wallet.isInstalled
  );
}

/**
 * Gets the best available wallet (prioritizes connected wallets)
 */
export function getBestAvailableWallet(): DetectedWallet | null {
  const detectionResult = detectEVMWallets();
  
  // First, return connected wallet if available
  if (detectionResult.connectedWallet) {
    return detectionResult.connectedWallet;
  }
  
  // Then, return first installed wallet
  if (detectionResult.wallets.length > 0) {
    return detectionResult.wallets[0];
  }
  
  return null;
} 